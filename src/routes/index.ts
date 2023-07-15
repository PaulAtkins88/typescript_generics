import { Router } from 'express';
import orderRouter from './Order.route';
import userRouter from './User.route';

const defaultRouter = Router();

defaultRouter.use('/api/users', userRouter);
defaultRouter.use('/api/orders', orderRouter);

export default defaultRouter;
