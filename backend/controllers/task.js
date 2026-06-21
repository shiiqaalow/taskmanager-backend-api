import { Task } from "../models/task.js";
// create new task
export const createTask = async (req, res, next) => {
  try {
    // find what the user and what hes has posted/typed
    const task = await Task.create({ ...req.body, createdBy: req.user._id });
    if (!task)
      return res
        .sttus(401)
        .json({ message: "No tasks found. try to create now." });
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (req, res, next) => {
  try {
    // find the user who posted

    let tasks = null;

    // show all tasks to the admin
    if (req.user.role === "admin") {
      tasks = await Task.find().populate("createdBy", "name email role");
    } else {
      // show the user its own task
      tasks = await Task.find({ createdBy: req.user._id });
    }

    if (tasks.length === 0) {
      return res.status(404).json({
        message: "No tasks found.",
      });
    }

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    // find the task id and the user
    // then update with the new one
    // By giving ({ new: true })

    let updateTask = null;

    // admin
    if (req.user.role === "admin") {
      updateTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      }).populate("createdBy", "name email");
    }
    // user
    else {
      updateTask = await Task.findOneAndUpdate(
        {
          _id: req.params.id,
          createdBy: req.user._id,
        },
        req.body,
        { new: true },
      );
    }

    // ❌ NOT FOUND
    if (!updateTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // ✅ SUCCESS
    res.status(200).json({
      message: "Task updated successfully",
      task: updateTask,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    // find the task id and the user/owner
    let deleteTask = null;
    if (req.user.role === "admin") {
      deleteTask = await Task.findOneAndDelete({ _id: req.params.id });
    } else {
      deleteTask = await Task.findOneAndDelete({
        _id: req.params.id,
        createdBy: req.user._id,
      });
    }
    if (!deleteTask) {
      res.status(404).json({ message: "No tasks found." });
    }

    res.status(200).json({
      message: "Task deleted successfully.",
      task: deleteTask,
    });
  } catch (error) {
    next(error);
  }
};
