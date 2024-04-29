import express from 'express';
import {protect, admin} from '../middleware/authMiddleware.js'
import { 
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserbyId,
    updateUser,
    deleteUser
} from '../controller/userController.js';

const router = express.Router();

// /api/orders
router.route('/')
.post(registerUser)
.get(protect, admin, getUsers);

router.post('/auth', authUser);
router.post('/logout', logoutUser);

router.route('/profile')
.get(protect, getUserProfile)
.put(protect, updateUserProfile);

//ADMIN ROUTES
router.route('/:id')
.delete(protect, admin, deleteUser)
.get(protect, admin, getUserbyId)
.put(protect, admin, updateUser);

export default router;