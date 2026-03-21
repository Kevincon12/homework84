import express from 'express';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import User from '../models/User';

const userSessionRouter = express.Router();

userSessionRouter.post('/', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).send({
                error: 'Username and password required',
            });
        }

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).send({
                error: 'User not found',
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).send({
                error: 'Incorrect password',
            });
        }

        user.token = crypto.randomUUID();
        await user.save();

        return res.send(user);
    } catch (e) {
        return res.status(400).send({
            error: 'Login error',
        });
    }
});

export default userSessionRouter;