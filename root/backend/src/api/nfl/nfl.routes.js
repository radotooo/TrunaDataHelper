import express from 'express';
import { getDataForCurrentAndNextWeek } from './nfl.service.js';

const router = express.Router();

router.get('/:week', async (req, res, next) => {
  const { week } = req.params;
  try {
    let parsedData = await getDataForCurrentAndNextWeek(week);
    res.json(parsedData);
  } catch (error) {
    next(error);
  }
});

export default router;
