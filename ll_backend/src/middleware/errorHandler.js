export default function errorHandler(err, req, res, next) {
  console.error('[ERROR] An error occurred:', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    error: {
      message,
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    },
  });
}