import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    orderPrice: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    orderItem: [orderItemSchema],
    orderStatus: {
      type: String,
      enum: ["PENDING", "SHIPPED", "DELIVERED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);
