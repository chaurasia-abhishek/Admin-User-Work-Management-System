const express = require('express');
const TaskSchema = require('../models/task');
const StatusSchema = require('../models/status');
const UserSchema = require('../models/user');
const router = express.Router();
const { body, validationResult, param } = require('express-validator');
const fetchUserId = require('../middleware/fetchuser')


router.post('/createtask', [
    body('task_description', 'task description cant be empty').isLength({ min: 3 }),
    body('assigneeId', 'enter valid user Id').isMongoId()
], fetchUserId, async (req, res) => {
    const error = validationResult(req);
    //validating the required fields
    if (!error.isEmpty())
        return res.status(400).json({ error: error.array(), success: false, msg: "task can't be empty, please assign task" })

    //finding the assignee & assigner details
    const assigedUser = await UserSchema.findById(req.body.assigneeId).select('-password');
    const user = await UserSchema.findById(req.user.id).select('-password');

    //if assigner have assigned some work
    //if assignee not found
    if (user === null)
        return res.status(400).json({ success: false, msg: 'invalid user details' })

    if (user.onWork)
        return res.status(400).json({ success: false, msg: 'you can`t assign work because someone have assigned work to you' })

    //if assignee not found
    if (assigedUser === null)
        return res.status(400).json({ success: false, msg: 'assign work to a valid team member' })

    //if assignee is on another work
    if (assigedUser.onWork)
        return res.status(400).json({ success: false, msg: 'assignee is on work assign work to someone else' })

    //if assignee is an admin
    if (assigedUser.Role === 'Admin')
        return res.status(400).json({ success: false, msg: 'you can`t assign work to admin, assign work to a team member' })

    try {
        //creating status-log
        let statusLog = await StatusSchema.create({
            status: "created",
            updatedBy: user.Name,
            updaterId: user._id
        })

        //creating task
        let newTask = await TaskSchema.create({
            task_description: req.body.task_description,
            createdBy: user.Name,
            createrId: user._id,
            assignedTo: assigedUser.Name,
            assigneeId: assigedUser._id,
            status: "created",
            statusLogs: statusLog
        })
        await UserSchema.findByIdAndUpdate(assigedUser._id, { onWork: true });
        res.status(200).json({ success: true, data: newTask })
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, error: error, msg: 'internal server error' });
    }
})

//view all tasks
router.get('/viewtask', fetchUserId, async (req, res) => {
    try {
        //sending task details
        const tasks = (await TaskSchema.find());
        res.status(200).json({ success: true, data: tasks });

    } catch (error) {
        console.error(error.message)
        return res.status(500).json({ success: false, msg: 'Internal server error ', error: error.message });
    }
})

//change the status of the task admin/task-creator/assignee
router.put('/status/:id',
    [body('status', ` status can be in-progress, completed and closed`).isString(),
    param('id', ` invalid id`).isMongoId()]
    , fetchUserId, async (req, res) => {
        const error = validationResult(req);
        //validating the required fields
        if (!error.isEmpty())
            return res.status(400).json({ error: error.array(), success: false, msg: "status can't be empty" })

        //finding the task in database
        const task = await TaskSchema.findById(req.params.id);

        //if task not found
        if (task === null)
            return res.status(400).json({ success: false, msg: 'invalid task Id try with valid task' })

        //if task not found
        if (task.status === 'closed')
            return res.status(400).json({ success: false, msg: 'task was completed successfully, you can`t change it now' })

        //who can update the status admin, task-create, task-assignee
        const user = await UserSchema.findById(req.user.id);

        //if user not found
        if (user === null)
            return res.status(400).json({ success: false, msg: 'invalid token try with valid token' })

        if (!(user._id.toString() === task.assigneeId.toString() || user.id.toString() === task.createrId.toString() || user.Role === 'Admin'))
            return res.status(400).json({ success: false, msg: 'you don`t have permission to change the status' })

        try {
            //user trying to change the status to closed
            if (req.body.status === 'closed')

                //user can't set status changed if user is not the creator nor the admin
                if (!(user.id.toString() === task.createrId.toString() || user.Role === 'Admin'))
                    return res.status(400).json({ success: false, msg: 'you don`t have permission to close the status' })
                else
                    await UserSchema.findByIdAndUpdate(task.assigneeId, { onWork: false })

            //creating status-log
            let statusLog = await StatusSchema.create({
                status: req.body.status,
                updatedBy: user.Name,
                updaterId: user._id
            })

            const updatedTask = await TaskSchema.findByIdAndUpdate(task._id, { status: req.body.status, $push: { statusLogs: statusLog } })
            await res.status(200).json({ data: updatedTask, success: true })

        } catch (error) {
            console.error(error.message)
            return res.status(500).json({ success: false, msg: 'Internal server error ', error: error.message });
        }

    }
)

//delete the task only admin user can
router.delete('/delete/:id', fetchUserId, async (req, res) => {
    const user = await UserSchema.findByIdAndUpdate(req.user.id);
    //if user is not an admin
    if (user === null || user.Role !== 'Admin')
        return res.status(400).json({ success: false, msg: 'you don`t have permission to delete the task' })
    try {
        //deleting the task
        const task = await TaskSchema.findByIdAndDelete(req.params.id);
        //if task is not found
        if (task === null)
            return res.status(400).json({ success: false, msg: 'invalid task id, task not found' })
        //updating the onwork status of assigne
        await UserSchema.findByIdAndUpdate(task.assigneeId, { onWork: false })
        res.status(200).json({ success: true, data: task })
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({ success: false, msg: 'Internal server error ', error: error.message });
    }
})

module.exports = router;
