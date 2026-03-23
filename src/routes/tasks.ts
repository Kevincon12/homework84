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

tasksRouter.get('/', auth, async (req, res) => {
    try {
        const user = (req as any).user;

        const tasks = await Task.find({ user: user._id });

        return res.send(tasks);
    } catch (e) {
        return res.status(500).send({
            error: 'Error fetching tasks',
        });
    }
});

tasksRouter.put('/:id', auth, async (req, res) => {
    try {
        const user = (req as any).user;
        const { id } = req.params;
        const { title, description, status } = req.body;

        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).send({
                error: 'Task not found',
            });
        }

        if (task.user.toString() !== user._id.toString()) {
            return res.status(403).send({
                error: 'Forbidden',
            });
        }

        if (title) task.title = title;
        if (description) task.description = description;
        if (status) task.status = status;

        await task.save();

        return res.send(task);
    } catch (e) {
        return res.status(400).send({
            error: 'Update error',
        });
    }
});

tasksRouter.delete('/:id', auth, async (req, res) => {
    try {
        const user = (req as any).user;
        const { id } = req.params;

        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).send({
                error: 'Task not found',
            });
        }

        if (task.user.toString() !== user._id.toString()) {
            return res.status(403).send({
                error: 'Forbidden',
            });
        }

        await task.deleteOne();

        return res.send({ message: 'Task deleted successfully' });
    } catch (e) {
        return res.status(400).send({
            error: 'Delete error',
        });
    }
});

export default tasksRouter;