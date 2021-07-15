import express from 'express';
import mongoose from 'mongoose';
import {authUser, getUserProfile, registerUser} from '../controllers/userController.js'
import { auth } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').post(registerUser)
router.post('/login',authUser)
router.route('/profile').get(auth,getUserProfile)

export default router;