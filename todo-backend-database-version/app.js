const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = () => {
  mongoose
    .connect(`${process.env.CONNECTION_STRING}`)
    .then(() => {
      console.log("DB successfully connected");
    })
    .catch((err) => {
      console.error("Error connecting to DB:", err);
    });
};

module.exports = connectDB;
