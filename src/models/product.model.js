import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  content: {
    type: String,
  },
  rating: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    productImageURL: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    manufacturedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Merchant",
    },
    productFeedback: [feedbackSchema],
    productType: {
      type: String,
      enum: [
        "TV",
        "SmartPhone",
        "Home Appliances",
        "Computing Devices",
        "Tablets",
        "Watches",
      ],
      required: true,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
