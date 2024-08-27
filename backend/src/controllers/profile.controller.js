import { User } from '../models/user.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';

const handleGetUserProfile = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  try {
    const user = await User.findById(_id).select(
      '-password -emailVerificationToken -emailVerificationExpiry -resetPasswordToken -resetPasswordExpiry'
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
const handleUpdateUserProfile = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const editedProfileData = req.body;
  try {
    await User.updateMany({ _id }, { ...editedProfileData });
    return res
      .status(200)
      .json(new ApiResponse(200, null, 'Update Profile Data'));
  } catch (e) {
    console.error('Failed to update Profile Data ERROR: ', e);
    return res
      .status(500)
      .json(new ApiResponse(500, null, 'Internal Server Error'));
  }
});

export { handleGetUserProfile, handleUpdateUserProfile };
