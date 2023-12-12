const fs = require("fs");
const ws = require("fs-extra");
const Todo = require("../models/todo");

// get all todos

const getAllTodos = async (req, res) => {
  try {
    // Find all todos
    const allTodos = await Todo.find();

    if (allTodos.length > 0) {
      res.status(200).json({
        success: true,
        allTodos,
      });
      console.log("All todos:", allTodos);
    } else {
      res.status(200).json({
        success: true,
        message: "no todos found",
      });
      console.log("No todos found");
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "server error",
    });
    console.error("Error getting todos:", error);
  }
};

// get single todo

const getSingleTodo = async (req, res) => {
  try {
    // Find todo by ID
    const { id } = req.body;
    const todo = await Todo.findById(id);
    console.log(id);

    if (todo) {
      res.status(200).json({
        success: true,
        todo,
      });
      console.log("Todo found:", todo);
    } else {
      res.status(200).json({
        success: true,
        message: "todo not found",
      });
      console.log("Todo not found");
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "server error!",
    });
    console.error("Error getting todo by ID:", error);
  }
};

// add the todo

const addTodo = async (req, res) => {
  try {
    const { work } = req.body;
    const savedTodo = await Todo.create({
      work,
    });

    res.status(200).json({
      work: savedTodo.work,
      id: savedTodo._id, // Include the ID if needed
    });

    console.log("Todo saved successfully:", savedTodo);
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });

    console.error(err);
  }
};

// update the todo

const updateTodo = async (req, res) => {
  try {
    // Find and update the todo
    const { id, work } = req.body;
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: id },
      { $set: { work } },
      { new: true } // Return the updated document
    );

    if (updatedTodo) {
      res.status(200).json({
        success: true,
        data: [
          {
            id,
            work,
          },
        ],
      });
      console.log("Todo updated:", updatedTodo);
    } else {
      es.status(200).json({
        success: true,
        message: "todo not found",
      });
      console.log("Todo not found");
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      error,
    });
    console.error("Error updating todo:", error);
  }
};

// delete the todo

const deleteTodo = async (req, res) => {
  const { id } = req.body;
  try {
    // Find and delete the todo
    const deletedTodo = await Todo.findOneAndDelete({ _id: id });

    if (deletedTodo) {
      res.stats(200).json({
        success: true,
        message: "successfully deleted",
      });
      console.log("Todo deleted:", deletedTodo);
    } else {
      res.stats(200).json({
        success: true,
        message: "todo not found",
      });
      console.log("Todo not found");
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "server error!",
    });
    console.error("Error deleting todo:", error);
  }
};

module.exports = {
  getAllTodos,
  getSingleTodo,
  addTodo,
  updateTodo,
  deleteTodo,
};
