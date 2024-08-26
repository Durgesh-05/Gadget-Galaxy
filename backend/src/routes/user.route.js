import express from 'express';
import { validateToken } from '../middlewares/auth.js';
import {
  handleUserRegistration,
  handleUserLogin,
  handleUserVerification,
  handleResendVerificationEmail,
  handleResetPasswordRequest,
  handleResetPassword,
  handleUserLogout,
} from '../controllers/user.controller.js';
const router = express.Router();

router.post('/signup', handleUserRegistration);
router.post('/signin', handleUserLogin);
router.post('/reset-password/request', handleResetPasswordRequest);
router.post('/reset-password', handleResetPassword);
router.get('/verification', handleUserVerification);
router.get('/logout', validateToken, handleUserLogout);
router.post('/:userId/request-verification', handleResendVerificationEmail);

export default router;
