import express from 'express';
import crypto from 'crypto';
import User from '../models/User';

const usersRouter = express.Router();

usersRouter.post('/', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).send({
                error: 'Username and password required',
            });
        }

        const user = new User({
            username,
            password,
            token: crypto.randomUUID(),
        });

        await user.save();

        return res.send(user);
    } catch (e: any) {
        if (e.code === 11000) {
            return res.status(400).send({
                error: 'Username already exists',
            });
        }

        return res.status(400).send({
            error: 'Something went wrong',
        });
    }
});

export default usersRouter;