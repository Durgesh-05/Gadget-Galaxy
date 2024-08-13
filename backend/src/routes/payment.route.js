import express from 'express';
import { handleCreatePaymentSession } from '../controllers/payment.controller.js';
const router = express.Router();

router.post('/', handleCreatePaymentSession);

export default router;
