import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { sendEmail } from "../utils/mail.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

const handleUserRegistration = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  if ([fullName, email, password].some((field) => !field || field.trim() === "")) {
    return res.status(400).json(new ApiResponse(400, " ", "All Fields Required!! "));
  }
  const existingUser = await User.findOne({ email }).select("-password");
  if (existingUser) {
    return res.status(409).json(new ApiResponse(409, existingUser, "Already Registered, Please Login!"));
  }

  const emailVerificationToken = await bcrypt.hash(email, 10);
  const user = await User.create({
    fullName, email, password, emailVerificationToken, emailVerificationExpiry: Date.now() + 24 * 60 * 60 * 1000,
  });

  const emailVerificationLink = `http://localhost:8000/api/v1/user/verify/${emailVerificationToken}`;
  const userDetails = {
    _id: user._id,
    name: user.fullName,
    email: user.email,
    address: user.address,
    role: user.role,
    Verification: user.isVerified
  };

  try {
    await sendEmail(fullName, email, emailVerificationLink);
    return res.status(201).json(new ApiResponse(200, userDetails, "User Registered Successfully & Email Sent for Verification"));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, null, "User registered but failed to send verification email. Please try again later."));
  }

});

export { handleUserRegistration };