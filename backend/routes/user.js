import express from 'express';
import { authorize } from '../middlewares/authorize.js';
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from '../controllers/user.js';
import { authProtect } from '../middlewares/authProtect.js';

export const user_routes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User Management APIs
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all registered users.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Users fetched successfully.
 *       500:
 *         description: Internal server error.
 */
user_routes.get('/',getUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve a specific user by their ID. Only admins can access this endpoint.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User fetched successfully.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden. Admin access required.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
user_routes.get(
    '/:id', authProtect, 
    authorize('admin'), 
    getUser
);

/**
 * @swagger
 * /users/update/{id}:
 *   put:
 *     summary: Update user
 *     description: Update a user's information. Accessible by the user themselves or an admin.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB User ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: ""
 *                 example: ""
 *               email:
 *                 type: ""
 *                 example: john@example.com
 *               profilePicture:
 *                 type: ""
 *                 example: https://res.cloudinary.com/demo/image/upload/avatar.jpg
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       400:
 *         description: Validation error.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
user_routes.put(
  '/update/:id',
  authProtect,
  authorize('admin', 'user'),
  updateUser
);

/**
 * @swagger
 * /users/delete/{id}:
 *   delete:
 *     summary: Delete user
 *     description: Delete a user account. Accessible by the user themselves or an admin.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
user_routes.delete(
  '/delete/:id',
  authProtect,
  authorize('admin', 'user'),
  deleteUser
);