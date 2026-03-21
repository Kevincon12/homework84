import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send({ message: 'API is working' });
});

const start = async () => {
    try {
        await mongoose.connect(config.db);
        console.log('Connected to MongoDB');

        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    } catch (e) {
        console.error('Error starting server:', e);
    }
};

start();