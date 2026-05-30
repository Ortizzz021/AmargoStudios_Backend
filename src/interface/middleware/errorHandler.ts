import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { AppError } from '../../shared/errors/AppError';
import { env } from '../../config/env';

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void => {
  let statusCode = 500;
  let message = 'Error interno del servidor';
  let details: any = undefined;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err.name === 'ValidationError') {
    // Handle mongoose or other validation errors if any
    statusCode = 400;
    message = err.message;
  }

  // Log only unexpected server errors in development or production
  if (statusCode === 500) {
    console.error('💥 Unexpected Error:', err);
  }

  res.status(statusCode).json({
    status: 'error',
    message,
    ...(details ? { details } : {}),
    ...(env.NODE_ENV === 'development' ? { stack: err.stack } : {}),
  });
};
