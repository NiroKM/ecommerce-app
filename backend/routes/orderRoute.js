import express from 'express';
import mongoose from 'mongoose';
import { addOrderItems, getMyOrders, getOrder, updateOrderToPaid } from '../controllers/orderController.js';
import { auth } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').post(auth, addOrderItems)
router.route('/myorders').get(auth, getMyOrders)
router.route('/:id').get(auth, getOrder)
router.route('/:id/pay').put(auth, updateOrderToPaid)


export default router;

 