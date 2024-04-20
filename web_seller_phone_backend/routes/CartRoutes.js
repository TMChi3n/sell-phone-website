import express from 'express';
import { addToCart, removeCartItem, updateCartItem } from '../controller/CartController.js';

const router = express.Router();

router.post('/cart/add', addToCart); // POST /api/cart/add

router.put('/cart/update/:id', updateCartItem); // PUT /api/cart/update/:id

router.delete('/cart/delete/:userId/:productId', removeCartItem); // DELETE /api/cart/delete/:userId/:productId

export default router;
