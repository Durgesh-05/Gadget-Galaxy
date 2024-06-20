import express from 'express';
const router = express.Router();
import {
  handleAddOrders,
  handleGetOrders,
} from '../controllers/order.controller.js';
import { validateToken } from '../middlewares/auth.js';

router.get('/', validateToken, handleGetOrders);

router.post('/', validateToken, handleAddOrders);

export default router;
