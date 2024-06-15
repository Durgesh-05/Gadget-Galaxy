import express from 'express';
import { verifyRoles, vaildateToken } from '../middlewares/auth.js';
import { roles } from '../constant.js';
const router = express.Router();

router
  .route('/')
  .get()
  .post(vaildateToken(), verifyRoles([roles.ADMIN]));

router
  .route('/:productId')
  .get()
  .patch(vaildateToken(), verifyRoles([roles.ADMIN]))
  .delete(vaildateToken(), verifyRoles([roles.ADMIN]));

router
  .route('/:productId/feedback')
  .get()
  .post(vaildateToken(), verifyRoles([roles.ADMIN, roles.USER]))
  .patch(vaildateToken(), verifyRoles([roles.ADMIN, roles.USER]))
  .delete(vaildateToken(), verifyRoles([roles.ADMIN, roles.USER]));

export default router;
