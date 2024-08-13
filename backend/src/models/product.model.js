import mongoose from 'mongoose';

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
      type: String,
      enum: [
        'TV',
        'SmartPhone',
        'Home Appliances',
        'Computing Devices',
        'Tablets',
        'Watches',
      ],
      required: true,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model('Product', productSchema);
