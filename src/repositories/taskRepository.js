let tasks = [
  {
    id: 1,
    title: "Learn Express.js",
    description: "Build a Task Management API",
    completed: false,
  },
];

let nextId = 2;

const getAll = () => {
  return tasks;
};

const getById = (id) => {
  return tasks.find((task) => task.id === id);
};

const create = (taskData) => {
  const task = {
    id: nextId++,
    ...taskData,
  };

  tasks.push(task);

  return task;
};

const update = (id, taskData) => {
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return null;
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    ...taskData,
  };

  return tasks[taskIndex];
};

const remove = (id) => {
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return null;
  }

  const deletedTask = tasks[taskIndex];

  tasks.splice(taskIndex, 1);

  return deletedTask;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
