const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    task_description: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    createrId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'UserSchema'
    },
    assigneeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'UserSchema'
    },
    assignedTo: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['created', 'in progress', 'completed', 'closed'],
        required: true
    },
    statusLogs: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model('TaskSchema', TaskSchema);