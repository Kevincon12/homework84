import mongoose, { Schema } from 'mongoose';

const TaskSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['new', 'in progress', 'complete'],
        default: 'new',
    },
});

const Task = mongoose.model('Task', TaskSchema);

export default Task;