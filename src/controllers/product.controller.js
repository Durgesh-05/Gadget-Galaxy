import { Product } from '../models/product.model.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { Feedback } from '../models/productFeedback.model.js';

const handleFetchProducts = asyncHandler(async (req, res) => {
  const allProducts = await Product.find({});
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { products: allProducts },
        'Product Retrieved SuccessFull'
      )
    );
});

const handleAddProduct = asyncHandler(async (req, res) => {
  const {
    productName,
    productDescription,
    productImageURL,
    stock,
    price,
    manufacturedBy,
    category,
  } = req.body;

  try {
    if (
      [
        productName,
        productDescription,
        productImageURL,
        stock,
        price,
        manufacturedBy,
        category,
      ].some((field) => field.trim() === '' || !field)
    ) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, 'All Fields Required'));
    }

    const product = await Product.create({
      productName,
      productDescription,
      productImageURL,
      stock,
      price,
      manufacturedBy,
      category,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, product, 'Product Added Successfully'));
  } catch (error) {
    console.error('Product Creation Failed ERROR: ', error);
    return res
      .status(500)
      .json(new ApiResponse(500, null, 'Internal Server Error'));
  }
});

const handleFetchProductById = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById({ _id: productId });

    if (!product) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, 'Product not Found'));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, product, 'Product Retrieval Successfull'));
  } catch (error) {
    console.error('Product retrieval Failed ERROR: ', error);
    return res
      .status(500)
      .json(new ApiResponse(500, null, 'Internal Server Error'));
  }
});

const handleUpdateProductById = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const updateFields = req.body;

  try {
    const product = await Product.findById({ _id: productId });
    if (!product) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, 'Product not Found'));
    }

    if (
      Object.keys(updateFields).some(
        (field) => !updateFields[field] || updateFields[field].trim() === ''
      )
    ) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, 'Fields are empty!'));
    }

    Object.assign(product, updateFields);
    await product.save({ validateBeforeSave: false });

    return res
      .status(200)
      .json(new ApiResponse(200, product, 'Field Updated Successfully'));
  } catch (error) {
    console.error('Product Update Failed ERROR: ', error);
    return res
      .status(500)
      .json(new ApiResponse(500, null, 'Internal Server Error'));
  }
});

const handleDeleteProductById = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById({ _id: productId });
    if (!product) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, 'Product not Found'));
    }

    await product.deleteOne({});
    return res
      .status(200)
      .json(new ApiResponse(200, null, 'Product Removed Successfully'));
  } catch (error) {
    console.error('Product Deletion Failed ERROR: ', error);
    return res
      .status(500)
      .json(new ApiResponse(500, null, 'Internal Server Error'));
  }
});

const handleFetchProductFeedback = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, 'Product not Found'));
    }
    const feedback = await Feedback.findOne({ productId });
    if (!feedback) {
      return res.status(200).json(new ApiResponse(200, null, 'No Feedback'));
    } else {
      return res
        .status(200)
        .json(new ApiResponse(200, feedback, 'Feedback Found Successfully'));
    }
  } catch (error) {
    console.error('Feedback Retrieval failed ERROR: ', error);
    return res
      .status(500)
      .json(new ApiResponse(500, null, 'Internal Server Error'));
  }
});
const handleAddProductFeedback = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { _id } = req.user;
  const { content, rating } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, 'Product not Found'));
    }
    if (!(content && rating)) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, 'All Fields Required'));
    }

    const feedback = await Feedback.create({
      productId,
      content,
      rating,
      postedBy: _id,
    });
    return res
      .status(201)
      .json(new ApiResponse(200, feedback, 'Feedback created Successfully'));
  } catch (error) {
    console.error('Feedback Creation Failed ERROR: ', error);
    return res
      .status(500)
      .json(new ApiResponse(500, null, 'Internal Server Error'));
  }
});

const handleUpdateProductFeedback = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const updateFields = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, 'Product not Found'));
    }

    if (
      Object.keys(updateFields).some(
        (field) => !updateFields[field] || updateFields[field].trim() === ''
      )
    ) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, 'Fields are empty!'));
    }

    const feedback = await Feedback.findOne({ productId });

    Object.assign(feedback, updateFields);
    await feedback.save({ validateBeforeSave: false });

    return res
      .status(200)
      .json(new ApiResponse(200, feedback, 'Field Updated Successfully'));
  } catch (error) {
    console.error('Feedback Update Failed ERROR: ', error);
    return res
      .status(500)
      .json(new ApiResponse(500, null, 'Internal Server Error'));
  }
});
const handleDeleteProductFeedback = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, 'Product not Found'));
    }

    const feedback = await Feedback.findOne({ productId });
    if (!feedback) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, 'Feedback Not Found'));
    }

    await feedback.deleteOne({});
    return res
      .status(200)
      .json(new ApiResponse(200, null, 'Feedback Removed Successfully'));
  } catch (error) {
    console.error('Feedback Deletion Failed ERROR: ', error);
    return res
      .status(500)
      .json(new ApiResponse(500, null, 'Internal Server Error'));
  }
});

export {
  handleFetchProducts,
  handleAddProduct,
  handleFetchProductById,
  handleUpdateProductById,
  handleDeleteProductById,
  handleFetchProductFeedback,
  handleAddProductFeedback,
  handleUpdateProductFeedback,
  handleDeleteProductFeedback,
};
