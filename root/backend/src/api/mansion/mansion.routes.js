import express from 'express';
import { parseData } from './mansion.service.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    let parsedData = await parseData();
    res.json(parsedData);
  } catch (error) {
    next(error);
  }
});

export default router;
