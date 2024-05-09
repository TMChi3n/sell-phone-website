import express from "express";
import authMiddleware from "../Middleware/authMiddleware.js";
import {
  addToCart,
  getCartItems,
  increaseCartQuantity,
  decreaseCartQuantity,
  removeProduct,
} from "../controller/cartController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: API endpoints related to the user's shopping cart
 */

/**
 * @swagger
 * /api/v1/cart/add:
 *   post:
 *     summary: Add product to cart
 *     description: Add a product to the user's shopping cart.
 *     tags: [Cart]
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Cart item details
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/CartItem'
 *     responses:
 *       200:
 *         description: Product added to cart successfully
 */
router.post("/cart/add", addToCart);

/**
 * @swagger
 * /api/v1/cart/{id_user}:
 *   get:
 *     summary: Get cart items
 *     description: Retrieve all items in the user's shopping cart.
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id_user
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose cart items to retrieve.
 *     responses:
 *       200:
 *         description: List of cart items
 */
router.get("/cart/:id_user", getCartItems);

/**
 * @swagger
 * /api/v1/cart/increase/{id_user}/{id_product}:
 *   put:
 *     summary: Increase cart item quantity
 *     description: Increase the quantity of a specific product in the user's shopping cart.
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id_user
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user.
 *       - in: path
 *         name: id_product
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product.
 *     responses:
 *       200:
 *         description: Cart item quantity increased successfully
 */
router.put("/cart/increase/:id_user/:id_product", increaseCartQuantity);

/**
 * @swagger
 * /api/v1/cart/decrease/{id_user}/{id_product}:
 *   put:
 *     summary: Decrease cart item quantity
 *     description: Decrease the quantity of a specific product in the user's shopping cart.
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id_user
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user.
 *       - in: path
 *         name: id_product
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product.
 *     responses:
 *       200:
 *         description: Cart item quantity decreased successfully
 */
router.put("/cart/decrease/:id_user/:id_product", decreaseCartQuantity);

/**
 * @swagger
 * /api/v1/cart/remove/{id_cart_item}:
 *   delete:
 *     summary: Remove product from cart
 *     description: Remove a product from the user's shopping cart.
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id_cart_item
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the cart item to remove.
 *     responses:
 *       200:
 *         description: Product removed from cart successfully
 */
router.delete("/cart/remove/:id_cart_item", removeProduct);

export default router;
