import { Task } from '../models/task.js'
import { io } from '../index.js'

export const createTask = async (req, res, next) => {
  try {
    const task = await Task.create({ ...req.body, createdBy: req.user._id })
    io.emit('task:created', task)
    res.status(201).json(task)
  } catch (error) {
    next(error)
  }
}

export const getTasks = async (req, res, next) => {
  try {
    let tasks

    if (req.user.role === 'admin') {
      tasks = await Task.find().populate('createdBy', 'name email role')
    } else {
      tasks = await Task.find({ createdBy: req.user._id })
    }

    res.status(200).json(tasks)  // ✅ always 200, empty array is valid
  } catch (error) {
    next(error)
  }
}

export const updateTask = async (req, res, next) => {
  try {
    let updatedTask

    if (req.user.role === 'admin') {
      updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .populate('createdBy', 'name email')
    } else {
      updatedTask = await Task.findOneAndUpdate(
        { _id: req.params.id, createdBy: req.user._id },
        req.body,
        { new: true }
      )
    }

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' })
    }

    io.emit('task:updated', updatedTask)  // ✅ broadcast updates too
    res.status(200).json({ message: 'Task updated successfully', task: updatedTask })
  } catch (error) {
    next(error)
  }
}

export const deleteTask = async (req, res, next) => {
  try {
    let deletedTask

    if (req.user.role === 'admin') {
      deletedTask = await Task.findOneAndDelete({ _id: req.params.id })
    } else {
      deletedTask = await Task.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id })
    }

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' })  // ✅ return added
    }

    io.emit('task:deleted', req.params.id)  // ✅ broadcast deletions too
    res.status(200).json({ message: 'Task deleted successfully', task: deletedTask })
  } catch (error) {
    next(error)
  }
}