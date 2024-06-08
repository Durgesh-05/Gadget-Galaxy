import mongoose from "mongoose";
import { validatePhoneNumber } from "../utils/utils.js";
const addressSchema = new mongoose.Schema({
  officeName: {
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

const merchantSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    companyLogoURL: {
      type: String,
      required: true,
    },
    companyDescription: {
      type: String,
      required: true,
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
    address: [addressSchema],
  },
  { timestamps: true }
);

export const Merchant = mongoose.model("Merchant", merchantSchema);
