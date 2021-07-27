import express from 'express';
import mongoose from 'mongoose';
import { addOrderItems, getOrder, updateOrderToPaid } from '../controllers/orderController.js';
import { auth } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/')
    .post(auth,addOrderItems)

router.route('/:id').get(auth,getOrder)
router.route('/:id/pay').put(auth,updateOrderToPaid)



export default router;   

