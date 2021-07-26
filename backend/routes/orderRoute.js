import express from 'express';
import mongoose from 'mongoose';
import { addOrderItems } from '../controllers/orderController.js';
import { auth } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/')
    .post(auth,addOrderItems)



export default router;   

