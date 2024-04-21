import express from 'express';
import authMiddleware from '../model/authMiddleware.js';
import { addToCart, getCartItems } from '../controller/CartController.js';


const router = express.Router();

router.use(authMiddleware);
router.post('/cart/add', addToCart);
router.get('/cart/:id_user', getCartItems);

export default router;

