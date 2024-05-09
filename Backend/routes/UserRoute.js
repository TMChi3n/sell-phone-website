import express from "express";
import {
  createUser,
  getDetailsUser,
  loginUser,
  getAllUser,
  refreshToken,
} from "../controller/userController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: API endpoints related to Login, Register, Refresh token, get detail user, get list users
 */

/**
 * @swagger
 * /api/v1/register:
 *   post:
 *     summary: Register new account
 *     description: Create new account with email register and receive notify of email
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Registration successful
 */
router.post("/register", (req, res) => createUser(req, res));

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: Login
 *     description: Login with email and password
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", (req, res) => loginUser(req, res));

/**
 * @swagger
 * /api/v1/get/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users.
 *     tags: [User]
 *     responses:
 *       200:
 *         description: A list of users.
 */
router.get("/get/users", (req, res) => getAllUser(req, res));

/**
 * @swagger
 * /api/v1/getDetailUser/{id_user}:
 *   get:
 *     summary: Get user details by ID
 *     description: Retrieve details of a user by their ID.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id_user
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to retrieve.
 *     responses:
 *       200:
 *         description: User details.
 */
router.get("/getDetailUser/:id_user", (req, res) => getDetailsUser(req, res));

/**
 * @swagger
 * /api/v1/refresh-token:
 *   post:
 *     summary: Refresh token
 *     description: Refresh authentication token
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefreshToken'
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 */
router.post("/refresh-token", (req, res) => refreshToken(req, res));

export default router;
