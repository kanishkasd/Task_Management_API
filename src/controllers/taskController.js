const taskService = require("../services/taskService");

const getTasks = (req, res, next) => {
  try {
    const tasks = taskService.getAllTasks();

    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

const getTask = (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID",
      });
    }

    const task = taskService.getTaskById(id);

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

const createTask = (req, res, next) => {
  try {
    const task = taskService.createTask(req.body);

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

const updateTask = (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID",
      });
    }

    const task = taskService.updateTask(id, req.body);

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTask = (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID",
      });
    }

    const task = taskService.deleteTask(id);

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
