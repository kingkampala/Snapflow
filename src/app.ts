import express, { Application } from 'express';
import { Client } from 'pg';
import syncDb from './sync';
import dotenv from 'dotenv';

const app: Application = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import imageRoutes from './routes/image';
import commentRoutes from './routes/comment';
import emailRoutes from './routes/email';

app.use(`/image`, imageRoutes);
app.use(`/comment`, commentRoutes);
app.use(`/email`, emailRoutes);

const { DB_URL } = process.env;

const connectDb = async () => {
    const client = new Client({
        connectionString: DB_URL,
    });

    try {
        await client.connect();
        console.log('database connection successful');

        await syncDb();
    } catch (err) {
        console.error('database connection error:', err);
    }

    return client;
}

export { app, connectDb };