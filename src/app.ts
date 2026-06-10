import express, { type Application } from 'express';
import userRoutes from './routes/users';

const app: Application = express();

// Parse incoming JSON request bodies
app.use(express.json());

// Mount user routes at /users
app.use('/users', userRoutes);

export default app;
