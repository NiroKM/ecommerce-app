import express from 'express';
import mongoose from 'mongoose';
import {deleteProduct, getProductById,getProducts} from '../controllers/productController.js'
import { auth, isAdmin } from '../middleware/authMiddleware.js';
const router = express.Router();


router.route('/').get(getProducts);
router.route('/:id').get(getProductById).delete(auth,isAdmin,deleteProduct);



export default router;