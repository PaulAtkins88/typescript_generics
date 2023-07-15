// express server app
import express from 'express';
import defaultRouter from './routes';

const app = express();

app.use(express.json());

app.use('/', defaultRouter);

export default app;
