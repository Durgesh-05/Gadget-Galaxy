import mongoose from "mongoose";
import bcrypt from "bcryptjs";
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
    fullName: {
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
    // address: [addressSchema],
    address: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    isVerified: {
      type: String,
      enum: ["VERIFIED", "PENDING"],
      default: "PENDING",
      required: true
    },
    emailVerificationToken: {
      type: String,
    },
    emailVerificationExpiry: {
      type: Date,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpiry: {
      type: Date,
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    console.log(`Error in Hashing Password ERROR: ${error}`);
  }
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);
