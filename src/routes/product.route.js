import express from 'express';
import { verifyRoles, vaildateToken } from '../middlewares/auth.js';
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
  .post(vaildateToken(), verifyRoles([roles.ADMIN]), handleAddProduct);

router
  .route('/:productId')
  .get(handleFetchProductById)
  .patch(vaildateToken(), verifyRoles([roles.ADMIN]), handleUpdateProductById)
  .delete(vaildateToken(), verifyRoles([roles.ADMIN]), handleDeleteProductById);

router
  .route('/:productId/feedback')
  .get(handleFetchProductFeedback)
  .post(
    vaildateToken(),
    verifyRoles([roles.ADMIN, roles.USER]),
    handleAddProductFeedback
  )
  .patch(
    vaildateToken(),
    verifyRoles([roles.ADMIN, roles.USER]),
    handleUpdateProductFeedback
  )
  .delete(
    vaildateToken(),
    verifyRoles([roles.ADMIN, roles.USER]),
    handleDeleteProductFeedback
  );

export default router;
