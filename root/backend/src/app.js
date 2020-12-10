import express from 'express';
import api from './api/routes.js';
import cors from 'cors';
import { notFound, errorHandler } from './middlewares.js';

const app = express();

//middleware
app.use(cors());
app.use(express.json());
//routes
app.use('/api/v1', api);

app.use(notFound);
app.use(errorHandler);

export default app;
