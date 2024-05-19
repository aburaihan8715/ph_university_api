import express, { Application } from 'express';
import { studentRouter } from './app/modules/student/student.route';
import cors from 'cors';
const app: Application = express();

// GLOBAL MIDDLEWARES
app.use(express.json());
app.use(cors());

// ROUTES
app.use('/api/v1/students', studentRouter);

export default app;
