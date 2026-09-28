# Task_Management_API

A simple RESTful Task Management API built with Node.js and Express.

The application follows a layered architecture:

```text
Controller
    ↓
Service
    ↓
Repository
```

## Project Structure

```text
task-api/
├── src/
│   ├── controllers/
│   │   └── taskController.js
│   ├── services/
│   │   └── taskService.js
│   ├── repositories/
│   │   └── taskRepository.js
│   └── app.js
├── .gitignore
├── README.md
└── package.json
```

## Requirements

* Node.js 18 or later
* npm

## Installation

Clone or download the project and open a terminal inside the project directory.

Install the dependencies:

```bash
npm install
```

## Running the Application

Start the server:

```bash
npm start
```

For development, use:

```bash
npm run dev
```

The API will run at:

```text
http://localhost:3000
```

## API Endpoints

### Get all tasks

```http
GET /api/tasks
```

Example:

```bash
curl http://localhost:3000/api/tasks
```

### Get a task

```http
GET /api/tasks/:id
```

Example:

```bash
curl http://localhost:3000/api/tasks/1
```

### Create a task

```http
POST /api/tasks
Content-Type: application/json
```

Request body:

```json
{
  "title": "Complete assignment",
  "description": "Finish the Task Management API"
}
```

Example:

```bash
curl -X POST http://localhost:3000/api/tasks \
-H "Content-Type: application/json" \
-d "{\"title\":\"Complete assignment\",\"description\":\"Finish the Task Management API\"}"
```

### Update a task

```http
PUT /api/tasks/:id
Content-Type: application/json
```

Request body:

```json
{
  "title": "Complete assignment",
  "description": "API completed",
  "completed": true
}
```

Example:

```bash
curl -X PUT http://localhost:3000/api/tasks/1 \
-H "Content-Type: application/json" \
-d "{\"completed\":true}"
```

### Delete a task

```http
DELETE /api/tasks/:id
```

Example:

```bash
curl -X DELETE http://localhost:3000/api/tasks/1
```

## Layer Separation

The application uses three main layers.

### 1. Controllers

Location:

```text
src/controllers/
```

Controllers are responsible for HTTP-related work.

They:

* Receive HTTP requests
* Read URL parameters and request bodies
* Call the appropriate service
* Return HTTP responses
* Handle HTTP-specific validation such as checking whether an ID is numeric

Controllers do not directly access the repository.

Example:

```text
HTTP Request
     ↓
Task Controller
     ↓
Task Service
```

### 2. Services

Location:

```text
src/services/
```

Services contain the application's business logic.

They:

* Validate task data
* Apply business rules
* Decide when a task does not exist
* Call repository methods
* Return business results to the controller

The service does not handle HTTP responses and does not manipulate the storage array directly.

Example:

```text
Task Controller
       ↓
Task Service
       ↓
Task Repository
```

### 3. Repositories

Location:

```text
src/repositories/
```

Repositories are responsible for data access.

The repository in this project uses an in-memory JavaScript array as temporary storage.

It provides operations for:

* Getting all tasks
* Finding a task
* Creating a task
* Updating a task
* Deleting a task

The repository does not know anything about HTTP requests or responses.

## Why This Separation Is Used

Each layer has a specific responsibility.

```text
Controller
HTTP handling
     ↓
Service
Business logic
     ↓
Repository
Data access
```

This prevents the application from putting all of its logic into a single file.

For example, if the application later changes from an in-memory array to MongoDB or PostgreSQL, the repository can be replaced without changing the controller or business logic.

Similarly, if the business rules change, the service can be modified without putting that logic into the HTTP controller.

## Data Storage

This project currently uses an in-memory array.

Therefore, all tasks will be lost when the server is restarted.

The repository can later be replaced with a database implementation such as PostgreSQL, MySQL, MongoDB, or SQLite while keeping the same overall layer structure.

## Example Response

A successful request returns JSON similar to:

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Learn Express.js",
    "description": "Build a Task Management API",
    "completed": false
  }
}
```

## Error Handling

The API returns appropriate HTTP status codes.

Examples:

```text
200 OK
201 Created
400 Bad Request
404 Not Found
500 Internal Server Error
```

Example error:

```json
{
  "success": false,
  "message": "Task not found"
}
```
