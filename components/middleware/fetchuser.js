const jwt = require('jsonwebtoken');// to encrypt and validate a authentication session
const jwt_string = 'heisagoodb$oy';//digital signature key for session authentication


const fetchUserId = (req, res, next) => { 
    const authToken = req.header('authToken');
    
    if (!authToken)
    return res.status(401).json({ success: false, msg: 'enter valid token' })
    try {
        const data = jwt.verify(authToken, jwt_string)
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).json({ success: false, msg: 'please authenticate with a valid token',error:error})

    }
}
module.exports = fetchUserId;