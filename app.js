const express = require("express");
const morgan = require("morgan");

const todoRoute = require("./Routes/TodoRoute");

const app = express();
const PORT = 3000;

app.use(morgan("tiny"));
app.use(express.urlencoded());
app.use(express.json());

app.use("/todo", todoRoute);

app.listen(PORT, () => {
  console.log(`listening on the port ${PORT}`);
});
