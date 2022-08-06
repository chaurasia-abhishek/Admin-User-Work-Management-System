const express = require('express');
const router = express.Router();
const UserSchema = require('../models/user');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchUserId = require('../middleware/fetchuser')
const jwt_string = 'heisagoodb$oy';//digital signature key for session authentication

const status = false;

//new user signup
router.post('/signup', [
    body('Name', 'enter a valid name').isLength({ min: 3 }),
    body('Email', 'enter a valid email').isEmail(),
    body('Password', 'password must contain atleast five characters').isLength({ min: 5 }),
    body('Role', 'enter Role either `Admin`, `Team Member`').notEmpty()
], async (req, res) => {
    // validating all the required fields
    const error = validationResult(req);
    if (!error.isEmpty())
        return res.status(400).json({ success: status, error: error.array(), msg: 'please fill all the required field correctly' });
    try {
        // is email already exist
        let newUser = await UserSchema.findOne({ Email: req.body.Email })
        if (newUser)
            return res.status(400).json({ success: status, msg: 'user already exist please try with another email' });

        //generating hash of the password
        const salt = await bcrypt.genSalt(10)
        let secPassword = await bcrypt.hash(req.body.Password, salt);

        //creating user profile in database
        newUser = await UserSchema.create({ ...req.body, Password: secPassword })

        //for response creating a json web token with digital signature key
        const data = {
            user: { id: newUser.id }
        }
        const authToken = jwt.sign(data, jwt_string)
        res.json({ authToken, success: true })
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({ success: status, msg: 'Internal server error ', error: error.message });
    }
}
)

//user login
router.post('/login', [
    body('Email', 'enter a valid email').isEmail(),
    body('Password', 'password cant empty').isEmpty()
], async (req, res) => {
    // validating all the required fields

    try {
        const error = validationResult(req);
        if (error.isEmpty())
            return res.status(400).json({ success: status, error: error.array(), msg: 'please fill all the required field correctly' });
        const { Email, Password } = req.body;

        // is email exist
        let currentUser = await UserSchema.findOne({ Email: Email })
        if (!currentUser)
            return res.status(400).json({ success: status, msg: 'enter valid credential to login' });

        //matching user password using hashing
        let comp_pass = await bcrypt.compare(Password, currentUser.Password);

        if (!comp_pass)
            return res.status(400).json({ success: status, msg: 'enter valid credential to login' });

        //for response creating a json web token with digital signature key
        const data = {
            user: { id: currentUser.id }
        }
        const authToken = jwt.sign(data, jwt_string)
        res.json({ authToken, success: true })

    } catch (error) {
        console.error(error.message)
        return res.status(500).json({ success: status, msg: 'Internal server error ', error: error.message });
    }
}
)

router.post('/fetchuser', fetchUserId, async (req, res) => {
    try {
        //sending user detail as a response to logined user
        const userId = req.user.id;
        const user = await UserSchema.findById(userId).select('-Password')
        res.json({ user, success: true })

    } catch (error) {
        console.error(error.message)
        return res.status(500).json({ success: status, msg: 'Internal server error ', error: error.message });
    }
})

router.get('/viewuser', fetchUserId, async (req, res) => {
    try {
        //sending team details Name-Role-onWork
        const teamUsers = (await UserSchema.find()).map(u => { return { Name: u.Name, Role: u.Role, onWork: u.onWork, id: u.id } });
        res.status(200).json({ teamUsers });

    } catch (error) {
        console.error(error.message)
        return res.status(500).json({ success: status, msg: 'Internal server error ', error: error.message });
    }
})

//deleting the users only admin user can
router.delete('/deleteuser/:id', fetchUserId, async (req, res) => {
    const user = await UserSchema.findByIdAndUpdate(req.user.id);
    //if user is not an admin
    if (user===null || user.Role !== 'Admin')
        return res.status(400).json({ success: status, msg: 'you don`t have permission to delete the task' })
    try {
        //sending team details Name-Role-onWork
        const userDelete = await UserSchema.findByIdAndDelete(req.params.id)
        //if user is not found
        if (userDelete === null)
            return res.status(400).json({ success: status, msg: 'invalid user id, user not found' })
        res.status(200).json({ success: true, userDelete })

    } catch (error) {
        console.error(error.message)
        return res.status(500).json({ success: status, msg: 'Internal server error ', error: error.message });
    }
})

module.exports = router;
