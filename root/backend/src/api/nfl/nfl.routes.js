import express from 'express';
import { parseDataFromWebsite } from './nfl.service.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let parsedData = await parseDataFromWebsite();
    res.json(parsedData);
  } catch (error) {}
});

export default router;
