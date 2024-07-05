import express from 'express';

import {
  getPurchasedStocks,
  getPurchasedStock,
  addPurchasedStock,
  updatePurchasedStock,
  removePurchasedStock
} from '../controllers/purchased_stocks.js';
import { jwtCheck, jwtParse } from "../middleware/auth.js";

const router = express.Router();

router.get('/', jwtCheck, jwtParse, getPurchasedStocks);
router.get('/:id', jwtCheck, jwtParse, getPurchasedStock);
router.post('/', jwtCheck, jwtParse, addPurchasedStock);
router.patch('/:id', jwtCheck, jwtParse, updatePurchasedStock);
router.delete('/:id', jwtCheck, jwtParse, removePurchasedStock);

export default router;
