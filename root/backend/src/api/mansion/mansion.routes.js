import express from 'express';
import { parseData } from './mansion.service.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let formatedData = await parseData();
    res.json(formatedData);
  } catch (error) {
    res.json(error.message);
  }
});

export default router;
