import express from 'express';

import { getTransactions } from '../controllers/transactions.js';
import { jwtCheck, jwtParse } from "../middleware/auth.js";

const router = express.Router();

router.get('/', jwtCheck, jwtParse, getTransactions);

export default router;
