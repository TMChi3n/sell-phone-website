import express from 'express';
import { addToCart, removeCartItem, updateCartItem } from '../controller/CartController.js';

const router = express.Router();

router.post('/cart/add', addToCart); 

router.put('/cart/update/:id', updateCartItem); 

router.delete('/cart/delete/:id', removeCartItem); 

export default router;
