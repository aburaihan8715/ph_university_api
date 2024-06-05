import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
const app: Application = express();

// GLOBAL MIDDLEWARES
app.use(express.json());
app.use(cors());

// ROUTES
app.use('/api/v1', router);

// TEST ROUTE
const test = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};
app.get('/', test);

// NOT FOUND ROUTE HANDLER
app.use(notFound);

// GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

export default app;
