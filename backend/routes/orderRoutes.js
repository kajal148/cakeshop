import { protect, admin} from '../middleware/authMiddleware.js';
import express from  'express';
import {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders
} from '../controller/orderController.js';

const router = express.Router();

router.route('/')
.post(protect, addOrderItems)
.get(protect, admin, getOrders);

router.route('/mine')
.get(protect, getMyOrders);

router.route('/:id').get(protect, getOrderById);

router.route('/:id/pay').put(protect, admin, updateOrderToPaid)

router.route('/:id/pay').put(protect, admin, updateOrderToDelivered)

export default router;
