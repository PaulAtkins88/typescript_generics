import { Router } from 'express';
import orderRouter from './Order.route';
import userRouter from './User.route';

/**
 * Main router combining all API routes.
 * 
 * TEACHING EXAMPLE: Route Organization
 * This file combines all entity-specific routers under a common API prefix.
 * 
 * Routes:
 * - /api/users/* → User CRUD operations
 * - /api/orders/* → Order CRUD operations
 */
const defaultRouter = Router();

defaultRouter.use('/api/users', userRouter);
defaultRouter.use('/api/orders', orderRouter);

export default defaultRouter;
