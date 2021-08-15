import express from 'express';
import mongoose from 'mongoose';
import { addOrderItems, getMyOrders, getOrder, getOrders, updateOrderToDelivered, updateOrderToPaid } from '../controllers/orderController.js';
import { auth, isAdmin } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').post(auth, addOrderItems).get(auth, isAdmin, getOrders)
router.route('/myorders').get(auth, getMyOrders)
router.route('/:id').get(auth, getOrder)
router.route('/:id/pay').put(auth, updateOrderToPaid)
router.route('/:id/deliver').put(auth,isAdmin, updateOrderToDelivered)


export default router;

