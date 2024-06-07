const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

const userRoutes = require("./routes/user-routes");

app.use(bodyParser.json());

app.use("/api/user", userRoutes);

mongoose
  .connect("mongodb://localhost:27017/UserLoginInfo")
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
