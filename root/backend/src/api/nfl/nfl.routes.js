import express from 'express';
import getData from './nfl.service.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let data = await getData();
    console.log(data);
    res.json(data);
  } catch (error) {}
});

export default router;
