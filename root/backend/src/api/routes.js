import express from 'express';
import mansion from './mansion/mansion.routes.js';
import nfl from './nfl/nfl.routes.js';

const router = express.Router();

router.use('/mansion', mansion);
router.use('/nfl', nfl);

export default router;
