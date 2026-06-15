import express from 'express'
import { authProtect } from '../middlewares/authProtect.js'
import { validate } from '../middlewares/validate.js'
import { createTaskSchema } from '../schemas/taskSchema.js'
import { createTask, deleteTask, getTasks, updateTask } from '../controllers/task.js'

export const task_routes = express.Router()

/**
 * @swagger
 * /task:
 *  get:
 *    summary: get all tasks for the logged-in user
 *    tags: [tasks]
 *    security:
 *       - bearerAuth: []
 *    responses: 
 *        200: 
 *           description: a list of tasks
 */

task_routes.get('/',getTasks)

/**
 * @swagger
 * /task/create:
 *  post:
 *      summary: Create a new task
 *      tags: [tasks]
 *      security:
 *         - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  required:
 *                      - title
 *                  properties:
 *                      title:
 *                          type: string
 *                      description: 
 *                          type: string
 *                      status:
 *                          type: string
 *                          enum: 
 *                           - pending   
 *                           - in-progress 
 *                           - completed
 *                      dueDate:
 *                          type: string
 *                          format: date
 *      responses:
 *          201: 
 *              description: Task created.
 *                
 */

task_routes.post('/create',validate(createTaskSchema),createTask)

/**
 * @swagger
 * /task/update/{id}:
 *   put:
 *     summary: Update a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum:
 *                   - pending
 *                   - in-progress
 *                   - completed
 *               dueDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       404:
 *         description: Task not found
 *       401:
 *         description: Unauthorized
 */

task_routes.put('/update/:id', authProtect, updateTask)

/**
 * @swagger
 * /task/delete/{id}:
 *   delete:
 *     summary: Update a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       404:
 *         description: Task not found
 *       401:
 *         description: Unauthorized
 */

task_routes.delete('/delete/:id',authProtect,deleteTask)