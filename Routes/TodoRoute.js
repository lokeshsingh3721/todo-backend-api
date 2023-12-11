const express = require("express");
const {
  getAllTodos,
  getSingleTodo,
  addTodo,
  updateTodo,
  deleteTodo,
} = require("../controller/TodoController");

const router = express.Router();

router.get("/get-todo", getAllTodos);

router.get("/get-single-todo/:id", getSingleTodo);

router.post("/add-todo", addTodo);

router.put("/update-todo/:id", updateTodo);

router.delete("/delete-todo/:id", deleteTodo);

module.exports = router;
