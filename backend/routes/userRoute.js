import express from 'express';
import mongoose from 'mongoose';
import { authUser, getAllUsers, getUserProfile, registerUser, updateUserProfile } from '../controllers/userController.js'
import { auth, isAdmin } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/')
    .post(registerUser).get(auth,isAdmin,getAllUsers)

router.post('/login', authUser)

router.route('/profile')
    .get(auth, getUserProfile)
    .put(auth, updateUserProfile)

export default router;