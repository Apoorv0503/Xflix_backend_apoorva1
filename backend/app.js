const express = require("express");
const helmet = require("helmet");
const httpStatus = require("http-status");
const { errorHandler } = require("./middlewares/error");
const ApiError = require("./utils/ApiError");
const routes = require("./routes/v1");
const app = express();


app.use(helmet());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

console.log("This is from App.js v1 Routes");

app.use("/v1", routes);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not Found"));
});

app.use(errorHandler);
module.exports = app
