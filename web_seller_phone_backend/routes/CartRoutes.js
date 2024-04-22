import express from 'express';
import authMiddleware from '../model/authMiddleware.js';
import { addToCart, getCartItems, increaseCartQuantity, decreaseCartQuantity } from '../controller/CartController.js';

const router = express.Router();

router.use(authMiddleware);
router.post('/cart/add', addToCart);
router.get('/cart/:id_user', getCartItems);
router.put('/cart/increase/:id_user/:id_product', increaseCartQuantity);
router.put('/cart/decrease/:id_user/:id_product', decreaseCartQuantity);

export default router;
