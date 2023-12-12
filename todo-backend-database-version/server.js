const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./app");
//importing the todo routes
const todoRoute = require("./Routes/TodoRoute");

//initialising the server
const app = express();
const PORT = 8080;

app.use(morgan("tiny"));
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());
connectDB();
app.use("/todo", todoRoute);

app.listen(PORT, () => {
  console.log(`listening on the port ${PORT}`);
});
