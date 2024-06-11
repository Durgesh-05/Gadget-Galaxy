import mongoose from "mongoose";
// const addressSchema = new mongoose.Schema({
//   apartment: {
//     type: String,
//   },
//   locality: {
//     type: String,
//   },
//   landmark: {
//     type: String,
//   },
//   pincode: {
//     type: String,
//   },
//   city: {
//     type: String,
//   },
//   district: {
//     type: String,
//   },
//   state: {
//     type: String,
//   },
// });

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
    // address: [addressSchema],
    address: {
      type: String,
    },
    isVerified: {
      type: String,
      enum: ["VERIFIED", "PENDING"],
      default: "PENDING",
      required: true
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
