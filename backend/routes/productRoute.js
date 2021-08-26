import express from 'express';
import mongoose from 'mongoose';
import { createProduct, createProductReview, deleteProduct, getProductById, getProducts, getTopRatedProducts, updateProduct } from '../controllers/productController.js'
import { auth, isAdmin } from '../middleware/authMiddleware.js';
const router = express.Router();


router.route('/').get(getProducts).post(auth, isAdmin, createProduct);
router.get('/top', getTopRatedProducts)
router.route('/:id/reviews').post(auth, createProductReview);
router.route('/:id').get(getProductById).delete(auth, isAdmin, deleteProduct).put(auth, isAdmin, updateProduct);



export default router;