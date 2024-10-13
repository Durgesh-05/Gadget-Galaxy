import { Order } from '../models/order.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';

const handleGetOrders = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  try {
    const orders = await Order.find({ createdBy: _id })
      .populate({
        path: 'orderItem.productId',
        model: 'Product',
      })
      .sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return res
        .status(200)
        .json(new ApiResponse(200, null, 'No order is created yet!'));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, orders, 'Order Retrieve Successfully'));
  } catch (error) {
    console.error('Failed to retrieve orders ERROR: ', error);
    return res
      .status(500)
      .json(new ApiResponse(500, null, 'Internal Server Error'));
  }
});

const handleAddOrders = asyncHandler(async (req, res) => {
  const orderDetails = req.body;

  try {
    if (Object.values(orderDetails).some((value) => !value)) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, 'All fields Required'));
    }

    const order = await Order.create({
      ...orderDetails,
      createdBy: req.user._id,
    });
    return res
      .status(201)
      .json(new ApiResponse(201, order, 'Order created Successfully'));
  } catch (error) {
    console.error('Failed to create Order ERROR: ', error);
    return res
      .status(500)
      .json(new ApiResponse(500, null, 'Internal Server Error'));
  }
});

export { handleAddOrders, handleGetOrders };
