import { User } from '../models/user.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';

const handleGetUserProfile = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  try {
    const user = await User.findById(_id).select(
      ' -password -address -emailVerificationToken -emailVerificationExpiry -resetPasswordToken -resetPasswordExpiry'
    );

    return res
      .status(200)
      .json(new ApiResponse(200, user, 'User Profile fetched Successfully'));
  } catch (error) {
    console.error('Failed to fetch user profile ERROR: ', error);
    return res
      .status(500)
      .json(new ApiResponse(500, null, 'Internal Server Error'));
  }
});
const handleUpdateUserProfile = asyncHandler();

export { handleGetUserProfile, handleUpdateUserProfile };
