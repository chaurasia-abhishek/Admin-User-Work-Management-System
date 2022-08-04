const mongoose = require('mongoose');
const StatusSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ['created', 'in progress', 'completed', 'closed'],
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    updatedBy: {
        type:String,
        required: true,

        // type: mongoose.Schema.Types.ObjectId,
        // required: true,
        // ref: 'UserSchema'
    }
})


module.exports = mongoose.model('StatusSchema', StatusSchema);