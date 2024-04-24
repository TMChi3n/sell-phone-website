import express from 'express';
import orderController from '../controller/OrderController.js';
import authMiddleware from '../model/authMiddleware.js';
import adminMiddleware from '../model/adminMiddleware.js'
const router = express.Router();
router.use(authMiddleware);
router.post('/create-order-from-cart', orderController.createOrderFromCartController);
router.get('/admin/orders', adminMiddleware,orderController.getAllOrder);
export default router;
