import express from 'express';
import { verifyRoles, validateToken } from '../middlewares/auth.js';
import { roles } from '../constant.js';
import {
  handleFetchProducts,
  handleAddProduct,
  handleFetchProductById,
  handleUpdateProductById,
  handleDeleteProductById,
  handleFetchProductFeedback,
  handleAddProductFeedback,
  handleUpdateProductFeedback,
  handleDeleteProductFeedback,
} from '../controllers/product.controller.js';
const router = express.Router();

router
  .route('/')
  .get(handleFetchProducts)
  .post(validateToken, verifyRoles([roles.ADMIN]), handleAddProduct);

router
  .route('/:productId')
  .get(handleFetchProductById)
  .patch(validateToken, verifyRoles([roles.ADMIN]), handleUpdateProductById)
  .delete(validateToken, verifyRoles([roles.ADMIN]), handleDeleteProductById);

router
  .route('/:productId/feedback')
  .get(handleFetchProductFeedback)
  .post(
    validateToken,
    verifyRoles([roles.ADMIN, roles.USER]),
    handleAddProductFeedback
  )
  .patch(
    validateToken,
    verifyRoles([roles.ADMIN, roles.USER]),
    handleUpdateProductFeedback
  )
  .delete(
    validateToken,
    verifyRoles([roles.ADMIN, roles.USER]),
    handleDeleteProductFeedback
  );

export default router;
