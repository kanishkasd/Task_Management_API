const taskRepository = require("../repositories/taskRepository");

const getAllTasks = () => {
  return taskRepository.getAll();
};

const getTaskById = (id) => {
  const task = taskRepository.getById(id);

  if (!task) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }

  return task;
};

const createTask = (taskData) => {
  const { title, description } = taskData;

  if (!title || title.trim() === "") {
    const error = new Error("Title is required");
    error.statusCode = 400;
    throw error;
  }

  return taskRepository.create({
    title: title.trim(),
    description: description ? description.trim() : "",
    completed: false,
  });
};

const updateTask = (id, taskData) => {
  const existingTask = taskRepository.getById(id);

  if (!existingTask) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }

  if (
    taskData.title !== undefined &&
    (!taskData.title || taskData.title.trim() === "")
  ) {
    const error = new Error("Title cannot be empty");
    error.statusCode = 400;
    throw error;
  }

  const updatedData = {};

  if (taskData.title !== undefined) {
    updatedData.title = taskData.title.trim();
  }

  if (taskData.description !== undefined) {
    updatedData.description = taskData.description.trim();
  }

  if (taskData.completed !== undefined) {
    if (typeof taskData.completed !== "boolean") {
      const error = new Error("Completed must be a boolean");
      error.statusCode = 400;
      throw error;
    }

    updatedData.completed = taskData.completed;
  }

  return taskRepository.update(id, updatedData);
};

const deleteTask = (id) => {
  const deletedTask = taskRepository.remove(id);

  if (!deletedTask) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }

  return deletedTask;
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
