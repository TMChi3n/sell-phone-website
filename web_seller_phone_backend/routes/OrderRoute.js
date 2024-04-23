import express from 'express';
import orderController from '../controller/OrderController.js';
import authMiddleware from '../model/authMiddleware.js';
const router = express.Router();
router.use(authMiddleware);
router.post('/create-order-from-cart', orderController.createOrderFromCartController);

export default router;
