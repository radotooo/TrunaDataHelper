import express from 'express';
import { parseData } from './mansion.service.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let parsedData = await parseData();
    res.json(parsedData);
  } catch (error) {
    res.json(error.message);
  }
});

export default router;
