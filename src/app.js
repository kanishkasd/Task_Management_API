const express = require("express");

const taskController = require("./controllers/taskController");

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/api/tasks", taskController.getTasks);

app.get("/api/tasks/:id", taskController.getTask);

app.post("/api/tasks", taskController.createTask);

app.put("/api/tasks/:id", taskController.updateTask);

app.delete("/api/tasks/:id", taskController.deleteTask);

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: error.message || "Internal server error",
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
