import express from 'express';
import { parseData } from './nfl.service.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let parsedData = await parseData();
    res.json(parsedData);
  } catch (error) {}
});

export default router;
