import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProductById,
  searchProduct,
  filterProduct,
} from "../controller/productController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API endpoints related to products
 */

/**
 * @swagger
 * /api/v1/get/product:
 *   get:
 *     summary: Get all products
 *     description: Retrieve a list of all products.
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of products.
 */
router.get("/get/product", (req, res) => getAllProducts(req, res));

/**
 * @swagger
 * /api/v1/get/product/{id}:
 *   get:
 *     summary: Get a product by ID
 *     description: Retrieve a single product by its ID.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to retrieve.
 *     responses:
 *       200:
 *         description: A single product object.
 */
router.get("/get/product/:id", (req, res) => getProductById(req, res));

/**
 * @swagger
 * /api/v1/post/product:
 *   post:
 *     summary: Create a new product
 *     description: Create a new product with the provided data.
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: The created product object.
 */
router.post("/post/product", (req, res) => createProduct(req, res));

/**
 * @swagger
 * /api/v1/put/product/{id}:
 *   put:
 *     summary: Update a product by ID
 *     description: Update a single product by its ID.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: The updated product object.
 */
router.put("/put/product/:id", (req, res) => updateProduct(req, res));

/**
 * @swagger
 * /api/v1/delete/product/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     description: Delete a single product by its ID.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to delete.
 *     responses:
 *       200:
 *         description: The deleted product object.
 */
router.delete("/delete/product/:id", (req, res) => deleteProductById(req, res));

/**
 * @swagger
 * /api/v1/search/product:
 *   get:
 *     summary: Search products
 *     description: Search products based on specified criteria.
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: The search query.
 *     responses:
 *       200:
 *         description: A list of products matching the search criteria.
 */
router.get("/search/product", (req, res) => searchProduct(req, res));

/**
 * @swagger
 * /api/v1/filter/product:
 *   get:
 *     summary: Filter products
 *     description: Filter products based on specified criteria.
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: criteria
 *         schema:
 *           type: string
 *         description: The criteria to filter products.
 *     responses:
 *       200:
 *         description: A list of products filtered based on the criteria.
 */
router.get("/filter/product", (req, res) => filterProduct(req, res));

export default router;
