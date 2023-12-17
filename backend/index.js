const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");
const express = require("express");



//Creating the express app
app.use(express.json());
const DB_URI = config.mongoose.url
mongoose
  .connect(`${DB_URI}`, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to DB at ", DB_URI))
  .catch(() => console.log("Failed to connect at DB at", DB_URI));
app.listen(`${config.port}`, () => {
  console.log(`App is running on port ${config.port}`);
});