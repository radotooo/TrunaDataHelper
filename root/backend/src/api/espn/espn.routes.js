import express from 'express';
import { getDataForCurrentAndNextWeek } from './espn.service.js';

const router = express.Router();

router.post('/', async (req, res, next) => {
  const { week } = req.body;
  try {
    let parsedData = await getDataForCurrentAndNextWeek(week);
    res.json(parsedData);
  } catch (error) {
    next(error);
  }
});

export default router;