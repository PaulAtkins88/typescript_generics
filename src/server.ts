import express from 'express';
import defaultRouter from './routes';

/**
 * Express application configuration.
 * 
 * TEACHING EXAMPLE: Application Setup
 * This file creates and configures the Express app with:
 * - JSON body parsing middleware
 * - Route configuration
 * 
 * The app is exported for use in index.ts (server startup)
 * and testing (no need to start actual server).
 */
const app = express();

// Parse JSON request bodies
app.use(express.json());

// Mount all API routes
app.use('/', defaultRouter);

export default app;
