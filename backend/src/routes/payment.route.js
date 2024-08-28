import express from 'express';
import { handleCreatePaymentSession } from '../controllers/payment.controller.js';
const router = express.Router();

router.post('/session', handleCreatePaymentSession);

export default router;
