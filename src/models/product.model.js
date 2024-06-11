import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  content: {
    type: String,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5
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
    price: {
      type: Number,
      required: true,
    },
    manufacturedBy: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    productFeedback: [feedbackSchema],

  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
