function notFound(req, res, next) {
  const err = new Error(`Not found - ${req.originalUrl}`);
  err.status = 404;
  next(err);
}

function errorHandler(error, req, res, next) {
  res.status(error.status);
  res.json({
    status: error.status,
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '' : error.stack,
  });
}

export { notFound, errorHandler };
