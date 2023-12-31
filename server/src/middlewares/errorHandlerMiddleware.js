const { StatusCodes } = require("http-status-codes");

const notFoundError = (req, res) => res.status(404).send("Page not found");

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, please try again later",
  };
  // Duplicate Error
  if (err.code && err.code === 11000) {
    customError.msg = `${Object.keys(err.keyValue)} has already existed`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // JWT expired
  if (err.message.includes("jwt expired")) {
    customError.msg = "Refresh token has expired, please login";
    customError.statusCode = StatusCodes.UNAUTHORIZED;
  }

  return res.status(customError.statusCode).json({ success: false, msg: customError.msg });
};

module.exports = { notFoundError, errorHandlerMiddleware };
