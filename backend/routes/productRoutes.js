import express from 'express';
const router = express.Router();
import {
  getProductById,
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
  updateProductStock,
  createProductReview,
  getTopProducts,
  getFeaturedProducts,
  getFeaturedProductsMobile,
} from '../controllers/productControllers.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id/reviews').post(protect, createProductReview);
router.get('/top', getTopProducts);
router.get('/featured', getFeaturedProducts);
router.get('/featuredmobile', getFeaturedProductsMobile);
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);
router.route('/:id/stock').put(protect, updateProductStock);

export default router;
