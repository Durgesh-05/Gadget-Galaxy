import express from 'express';
import {
  handleGetUserProfile,
  handleUpdateUserProfile,
} from '../controllers/profile.controller.js';
import { validateToken } from '../middlewares/auth.js';
const router = express.Router();

router
  .route("/")
  .get(validateToken, handleGetUserProfile)
  .patch(validateToken, handleUpdateUserProfile);

export default router;
