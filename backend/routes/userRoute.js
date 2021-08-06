import express from 'express';
import mongoose from 'mongoose';
import { authUser, deleteUser, getAllUsers, getUser, getUserProfile, registerUser, updateUser, updateUserProfile } from '../controllers/userController.js'
import { auth, isAdmin } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/')
    .post(registerUser).get(auth, isAdmin, getAllUsers)

router.post('/login', authUser)

router.route('/profile')
    .get(auth, getUserProfile)
    .put(auth, updateUserProfile)

router.route('/:id').delete(auth, isAdmin, deleteUser).get(auth,isAdmin,getUser).put(auth,isAdmin,updateUser)

export default router;