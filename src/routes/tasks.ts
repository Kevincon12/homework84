import express from 'express';
import Task from '../models/Task';
import auth from '../middleware/auth';

const tasksRouter = express.Router();

tasksRouter.post('/', auth, async (req, res) => {
    try {
        const { title, description, status } = req.body;

        if (!title || !description) {
            return res.status(400).send({
                error: 'Title and description required',
            });
        }

        const user = (req as any).user;

        const task = new Task({
            user: user._id,
            title,
            description,
            status,
        });

        await task.save();

        return res.send(task);
    } catch (e) {
        return res.status(400).send({
            error: 'Error creating task',
        });
    }
});

export default tasksRouter;