import express from "express";
import orderController from "../controller/orderController.js";
import authMiddleware from "../Middleware/authMiddleware.js";
import adminMiddleware from "../Middleware/adminMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: API endpoints related to orders
 */

/**
 * @swagger
 * /api/v1/create-order-from-cart:
 *   post:
 *     summary: Create order from cart
 *     description: Create a new order from items in the user's shopping cart.
 *     tags: [Order]
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Order details
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: Order created successfully
 */
router.post(
  "/create-order-from-cart",
  orderController.createOrderFromCartController
);

/**
 * @swagger
 * /api/v1/admin/orders:
 *   get:
 *     summary: Get all orders (Admin)
 *     description: Retrieve a list of all orders. (Admin access required)
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of orders
 */
router.get(
  "/admin/orders",
  authMiddleware,
  adminMiddleware,
  orderController.getAllOrder
);

/**
 * @swagger
 * /api/v1/orders/{id}:
 *   delete:
 *     summary: Delete order
 *     description: Delete a specific order by its ID.
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order to delete.
 *     responses:
 *       200:
 *         description: Order deleted successfully
 */
router.delete("/orders/:id", orderController.deleteOrder);

export default router;
