import express from 'express';
import { parseDataFromWebsite, parseDataFromApi } from './nfl.service.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let parsedData = await parseDataFromWebsite();
    res.json(parsedData);
  } catch (error) {}
});

router.get('/', async (req, res) => {
  try {
    let parsedData = await parseDataFromApi();
    res.json(parsedData);
  } catch (error) {}
});

export default router;
