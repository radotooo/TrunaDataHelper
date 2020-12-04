import express from 'express';
import api from './api/routes.js';

const app = express();

//routes
app.use('/api/v1', api);

export default app;
