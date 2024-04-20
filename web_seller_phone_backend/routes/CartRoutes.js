import express from 'express';
import { addToCart, removeItem, updateItem } from '../controller/CartController.js';

const router = express.Router();

router.post('/cart/add', addToCart); 

router.put('/cart/update/:id', updateItem); 

router.delete('/cart/delete/:id', removeItem); 

export default router;
