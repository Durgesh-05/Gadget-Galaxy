import express from "express";
import { handleUserRegistration, handleUserLogin, handleUserVerification, handleResendVerificationEmail, handleResetPasswordRequest, handleResetPassword } from "../controllers/user.controller.js";
const router = express.Router();

router.post("/signup", handleUserRegistration);
router.post("/signin", handleUserLogin);
router.post("/reset-password/request", handleResetPasswordRequest);
router.post("/reset-password", handleResetPassword);
router.get("/verification", handleUserVerification);
router.post("/:userId/request-verification", handleResendVerificationEmail);

export default router;