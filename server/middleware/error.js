import ErrorResponse from '../utils/errorResponse.js';

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  // console.log('err.message', err.message, "error.message", error.message);
  error.message = err.message;

  if(err.code === 11000){
    const message = 'Duplicate Field Value Entered';
    error = new ErrorResponse(message, 400);
  }

  if(err.name === "ValidationError") {
    const message = Object.values(err.errors).map(val => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(err.statusCode || 500).json({
    success: false,
    error: error.message || "Server error"
  });
}

export default errorHandler;