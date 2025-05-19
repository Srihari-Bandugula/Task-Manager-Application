const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const User = require('../models/User');

/**
 * @swagger
 * tags:
 *   name: TaskSharing
 *   description: Task creation, sharing, and user-visible tasks
 */

/**
 * @swagger
 * /api/task-share:
 *   post:
 *     summary: Create a new task
 *     tags: [TaskSharing]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, description, ownerId]
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               ownerId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', async (req, res) => {
  const { title, description, ownerId } = req.body;
  const task = new Task({ title, description, owner: ownerId });
  await task.save();
  res.json(task);
});

/**
 * @swagger
 * /api/task-share/{taskId}/share:
 *   post:
 *     summary: Share a task with another user
 *     tags: [TaskSharing]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the task to share
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userIdToShare]
 *             properties:
 *               userIdToShare:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task shared successfully
 *       404:
 *         description: Task not found
 */
router.post('/:taskId/share', async (req, res) => {
  const { userIdToShare } = req.body;
  const task = await Task.findById(req.params.taskId);

  if (!task) return res.status(404).send('Task not found');

  if (!task.sharedWith.includes(userIdToShare)) {
    task.sharedWith.push(userIdToShare);
    await task.save();
  }

  res.json({ message: 'Task shared successfully', task });
});

/**
 * @swagger
 * /api/task-share/user/{userId}:
 *   get:
 *     summary: Get tasks visible to a user (owned or shared)
 *     tags: [TaskSharing]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of tasks visible to the user
 *       500:
 *         description: Server error
 */
router.get('/user/:userId', async (req, res) => {
  const userId = req.params.userId;

  const tasks = await Task.find({
    $or: [
      { owner: userId },
      { sharedWith: userId }
    ]
  }).populate('owner sharedWith', 'email');

  res.json(tasks);
});

module.exports = router;
