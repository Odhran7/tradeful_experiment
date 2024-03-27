// Error handling middleware

import config from "../config/index.js";

const errorMiddleware = (err, req, res, next) => {
  config.logger.error(`Error processing request ${req.method} ${req.path}`, {
    error: err,
    body: req.body,
    user: req.user,
  });
  res
    .status(err.status || 500)
    .json({ message: err.message || "An unexpected error occurred" });
};

export default errorMiddleware;
