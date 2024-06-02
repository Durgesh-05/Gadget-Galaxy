import mongoose from "mongoose";
import { validatePhoneNumber } from "../utils/utils.js";
const addressSchema = new mongoose.Schema({
  apartment: {
    type: String,
    required: true,
  },
  locality: {
    type: String,
    required: true,
  },
  landmark: {
    type: String,
  },
  pincode: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
});

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
      validate: {
        validator: validatePhoneNumber,
        message: "Invalid Mobile Number",
      },
    },
    roles: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    address: [addressSchema],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
