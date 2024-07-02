import express from 'express';

import { getActionLogs } from '../controllers/action_logs.js';
import { jwtCheck, jwtParse } from "../middleware/auth.js";

const router = express.Router();

router.get('/', jwtCheck, jwtParse, getActionLogs);

export default router;
