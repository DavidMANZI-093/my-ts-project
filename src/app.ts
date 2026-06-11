import cors from "cors";
import express, { type Application } from 'express';
import userRoutes from './routes/users';

const app: Application = express();

// Parse incoming JSON request bodies
app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:3001",
    "https://learn-coding-frontend-beta.vercel.app",
  ],
  credentials: true,
}));

app.get('/', (req, res) => {
  res.send('Welcome to the home route!');
});

// Mount user routes at /users
app.use('/users', userRoutes);

export default app;
