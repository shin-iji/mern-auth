const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

const userRoute = require("./routes/userRoute");
const todoRoute = require("./routes/todoRoute");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use("/users", userRoute);
app.use("/todos", todoRoute);

mongoose.connect(process.env.MONGODB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log("MongoDB Connected");
  return app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
