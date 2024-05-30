import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import httpStatus from 'http-status';
const app: Application = express();

// GLOBAL MIDDLEWARES
app.use(express.json());
app.use(cors());

// ROUTES
app.use('/api/v1', router);

// TEST ROUTE
// NOTE: This route is not working
const test = (req: Request, res: Response) => {
  const a = 10;
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Test route!!',
    data: a,
  });
};
app.get('/', test);

// NOT FOUND ROUTE HANDLER
app.use(notFound);

// GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

export default app;
