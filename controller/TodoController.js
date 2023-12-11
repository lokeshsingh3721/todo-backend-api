const fs = require("fs");
const ws = require("fs-extra");

// get all todos

const getAllTodos = (req, res) => {
  fs.readFile("./todo-items.json", "utf-8", (err, data) => {
    if (err)
      return res.status(404).json({
        success: false,
        err: err.message,
      });
    else data = JSON.parse(data);
    res.status(200).json({
      success: true,
      data,
    });
  });
};

// get single todo

const getSingleTodo = (req, res) => {
  fs.readFile("./todo-items.json", "utf-8", (err, data) => {
    if (err)
      return res.status(404).json({
        success: false,
        err: err.message,
      });
    else {
      const { id } = req.params;
      data = JSON.parse(data);
      const singleTodo = data.filter((todo) => todo.id === Number(id));
      if (singleTodo.length === 0)
        return res.status(404).json({
          success: false,
          message: `todo not exist with id ${id}`,
        });
      return res.status(200).json({
        success: true,
        data: singleTodo,
      });
    }
  });
};

// add the todo

const addTodo = (req, res) => {
  const todo = req.body;

  // Reading the data from the file
  let data = fs.readFileSync("./todo-items.json");
  data = JSON.parse(data);

  //check if already exist or not
  const temp = data.filter((td) => td.id === todo.id);
  if (temp.length != 0)
    return res.json({
      success: false,
      message: "todo already exists!",
    });
  // adding data to the todo
  data.push(todo);
  ws.writeJson("./todo-items.json", data)
    .then(() => {
      res.status(200).json({
        success: true,
        message: "successfully Added",
        data,
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

// update the todo

const updateTodo = (req, res) => {
  const { id } = req.params;
  const { work } = req.body;
  // Reading the data from the file
  let data = fs.readFileSync("./todo-items.json");
  data = JSON.parse(data);

  // changing the todo
  data = data.filter((todo) => {
    if (todo.id === Number(id)) todo.work = work;
    return todo;
  });

  ws.writeJson("./todo-items.json", data)
    .then(() => {
      res.status(200).json({
        success: true,
        message: "successfully updated",
        data,
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

// delete the todo

const deleteTodo = (req, res) => {
  const { id } = req.params;
  // Reading the data from the file
  let data = fs.readFileSync("./todo-items.json");
  data = JSON.parse(data);

  // if id not exist or no todos
  const temp = data.filter((todo) => {
    return todo.id === Number(id);
  });

  if (temp.length == 0)
    return res.status(404).json({
      success: false,
      message: `no todo with  id ${id} `,
    });

  data = data.filter((todo) => {
    console.log(todo.id);
    return todo.id !== Number(id);
  });

  ws.writeJson("./todo-items.json", data)
    .then(() => {
      res.status(200).json({
        success: true,
        message: "successfully deleted",
        data,
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = {
  getAllTodos,
  getSingleTodo,
  addTodo,
  updateTodo,
  deleteTodo,
};
