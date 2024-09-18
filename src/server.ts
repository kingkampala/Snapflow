import { app, connectDb } from './app';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

const startServer = async () => {
    try {
        await connectDb();

        app.listen(port, '0.0.0.0', () => {
            console.log(`server running on port ${port}`);
          });
        } catch (error) {
          console.error('error starting the server', error);
        }
};

startServer();