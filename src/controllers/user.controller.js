import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { sendEmailForVerification } from '../utils/verificationMail.js';
import { User } from '../models/user.model.js';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendEmailForResetPassword } from '../utils/resetPasswordMail.js';

const generateAccessAndRefreshToken = (_id, role, verification) => {
  const accessToken = jwt.sign(
    { _id, role, verification },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
  const refreshToken = jwt.sign(
    { _id, role, verification },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );

  return { accessToken, refreshToken };
};

const handleUserRegistration = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  if (
    [fullName, email, password].some((field) => !field || field.trim() === '')
  ) {
    return res
      .status(400)
      .json(new ApiResponse(400, ' ', 'All Fields Required!!'));
  }

  const existingUser = await User.findOne({ email }).select('-password');
  if (existingUser) {
    return res
      .status(409)
      .json(new ApiResponse(409, null, 'Already Registered, Please Login!'));
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          null,
          'Password length must be greater than 8 characters'
        )
      );
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const emailVerificationToken = crypto.randomBytes(32).toString('hex');
  const user = await User.create({
    fullName,
    email,
    password: hashedPassword,
    emailVerificationToken,
    emailVerificationExpiry: Date.now() + 24 * 60 * 60 * 1000,
  });

  const userDetails = {
    _id: user._id,
    name: user.fullName,
    email: user.email,
    address: user.address,
    role: user.role,
    verification: user.verification,
  };

  const emailVerificationLink = `http://localhost:8000/api/v1/user/verification?tokenId=${emailVerificationToken}`;

  try {
    await sendEmailForVerification(fullName, email, emailVerificationLink);
    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          userDetails,
          'User Registered Successfully & Email Sent for Verification'
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          null,
          'User registered but failed to send verification email. Please try again later.'
        )
      );
  }
});

const handleUserLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, 'All Fields Required'));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, 'Email Not Registered!'));
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res
      .status(401)
      .json(new ApiResponse(401, null, 'Email or Password is Incorrect'));
  }

  if (user.verification === 'PENDING') {
    return res
      .status(401)
      .json(new ApiResponse(401, null, 'Verification is Pending'));
  }

  const { accessToken, refreshToken } = generateAccessAndRefreshToken(
    user._id,
    user.role,
    user.verification
  );

  const cookieOptions = {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  };

  res.cookie('accessToken', accessToken, cookieOptions);
  res.cookie('refreshToken', refreshToken, cookieOptions);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        _id: user._id,
        name: user.fullName,
        email: user.email,
        role: user.role,
        accessToken: accessToken,
      },
      'Login Successful'
    )
  );
});

const handleUserVerification = asyncHandler(async (req, res) => {
  const tokenId = req.query.tokenId;

  const user = await User.findOne({
    emailVerificationToken: tokenId,
    emailVerificationExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return res
      .status(401)
      .json(new ApiResponse(401, null, 'Token is Invalid or Expired'));
  }

  user.verification = 'VERIFIED';
  user.emailVerificationToken = undefined;
  user.emailVerificationExpiry = undefined;
  await user.save();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { userVerification: 'VERIFIED' },
        'Email has been Verified'
      )
    );
});

const handleResendVerificationEmail = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);

  if (!user) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, 'User Not Registered'));
  }

  const emailVerificationLink = `http://localhost:8000/api/v1/user/verification?tokenId=${user.emailVerificationToken}`;

  try {
    await sendEmailForVerification(
      user.fullName,
      user.email,
      emailVerificationLink
    );
    return res
      .status(200)
      .json(new ApiResponse(200, null, 'Email Verification Link Sent'));
  } catch (error) {
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          null,
          'Failed to send verification email. Please try again later.'
        )
      );
  }
});

const handleResetPasswordRequest = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, 'User not Registered'));
  }

  const resetPasswordToken = crypto.randomBytes(32).toString('hex');
  user.resetPasswordToken = resetPasswordToken;
  user.resetPasswordExpiry = Date.now() + 24 * 60 * 60 * 1000;

  await user.save({ validateBeforeSave: false });

  const resetPasswordLink = `http://localhost:8000/api/v1/user/reset-password`;

  try {
    await sendEmailForResetPassword(
      user.fullName,
      user.email,
      resetPasswordLink,
      resetPasswordToken
    );
    return res
      .status(200)
      .json(new ApiResponse(200, null, 'Email Verification Link Sent'));
  } catch (error) {
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          null,
          'Failed to send verification email. Please try again later.'
        )
      );
  }
});

const handleResetPassword = asyncHandler(async (req, res) => {
  const { newPassword, tokenId } = req.body;

  if (!(newPassword && tokenId)) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, 'All Fields Required'));
  }

  if (newPassword.length < 8) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          null,
          'Password length must be greater than 8 characters'
        )
      );
  }

  const user = await User.findOne({
    resetPasswordToken: tokenId,
    resetPasswordExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, 'Token is Invalid or Expired'));
  }

  user.password = newPassword;
  user.resetPasswordExpiry = undefined;
  user.resetPasswordToken = undefined;
  await user.save({ validateBeforeSave: false });
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        verification: user.verification,
      },
      'Password Reset SuccessFully'
    )
  );
});

export {
  handleUserRegistration,
  handleUserLogin,
  handleUserVerification,
  handleResendVerificationEmail,
  handleResetPasswordRequest,
  handleResetPassword,
};
