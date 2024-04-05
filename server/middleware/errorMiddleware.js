// Middleware to handle JSON syntax errors
export const errorMiddleware = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    // Syntax error occurred in JSON request body
    return res
      .status(400)
      .json({ success: false, error: "Invalid JSON syntax" });
  }
  // Pass the error to the next middleware or error handler
  next(err);
};
