import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken';

const verifyRoles = (roles = []) =>
  asyncHandler(async (req, res, next) => {
    if (roles.includes(req.user.role)) {
      return next();
    } else {
      return res
        .status(401)
        .json(new ApiResponse(401, null, 'No Authorized to this Endpoint'));
    }
  });

const validateToken = asyncHandler(async (req, res, next) => {
  const token = req.cookies['accessToken'];
  if (!token) {
    return res
      .status(401)
      .json(new ApiResponse(401, null, 'Missing Authorization Token'));
  }
  try {
    const tokenPayload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!tokenPayload) {
      return res
        .status(401)
        .json(new ApiResponse(401, null, 'Token is Invalid'));
    }
    const user = await User.findById({ _id: tokenPayload._id }).select(
      ' -password -address -emailVerificationToken -emailVerificationExpiry -resetPasswordToken -resetPasswordExpiry'
    );

    if (!user) {
      return res
        .status(401)
        .json(new ApiResponse(401, null, 'Token is Invalid'));
    }
    req.user = user;
    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res
        .status(401)
        .json(
          new ApiResponse(
            401,
            { reqTokenUrl: 'http://localhost:8000/api/v1/user/request-token' },
            'Token Expired'
          )
        );
    }
    console.log('Authentication Error, ERROR: ', error);
    return res
      .status(500)
      .json(new ApiResponse(500, null, 'Internal Server Error'));
  }
});

export { validateToken, verifyRoles };
