import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: {
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

export const Category = mongoose.model('Category', categorySchema);
