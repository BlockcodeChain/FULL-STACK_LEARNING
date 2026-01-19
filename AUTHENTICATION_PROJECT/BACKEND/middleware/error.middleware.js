class ErrorHandler extends Error {
    constructor (message,statusCode){
      super(message);
      this.statusCode=statusCode
    }
}

export const errorMiddleware = (err, req, res, next) => {
  // default safety
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // MongoDB invalid ObjectId
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}`;
  }

  // MongoDB duplicate key
  if (err.code === 11000) {
    statusCode = 400;
    message = `Duplicate ${Object.keys(err.keyValue)} entered`;
  }

  // JWT invalid
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token, please login again";
  }

  // JWT expired
  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired, please login again";
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};