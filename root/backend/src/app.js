import express from 'express';
import api from './api/routes.js';
import cors from 'cors';

const app = express();

//middleware
app.use(cors());

//routes
app.use('/api/v1', api);

export default app;
