const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log the error to the console

  // Default error message and status code
  let statusCode = 500;
  let message = 'An unexpected error occurred';

  // Customize error messages based on error types
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Invalid input data';
  } else if (err.name === 'UnauthorizedError') {
    statusCode = 401;
    message = 'Unauthorized access';
  } else if (err.name === 'ForbiddenError') {
    statusCode = 403;
    message = 'Access forbidden';
  } else if (err.name === 'NotFoundError') {
    statusCode = 404;
    message = 'Resource not found';
  }

  res.status(statusCode).json({ error: message });
};

module.exports = errorHandler;