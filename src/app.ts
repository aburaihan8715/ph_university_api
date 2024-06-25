import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import cookieParser from 'cookie-parser';
const app: Application = express();

// GLOBAL MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'] }));

// ROUTES
app.use('/api/v1', router);

// TEST ROUTE
const test = (req: Request, res: Response) => {
  const a = 10;
  res.status(200).json({
    message: 'Hello from test route',
    data: a,
  });
};
app.get('/', test);

// NOT FOUND ROUTE HANDLER
app.use(notFound);

// GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

export default app;
