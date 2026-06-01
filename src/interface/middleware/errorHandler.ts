import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { AppError } from '../../shared/errors/AppError';
import { env } from '../../config/env';
import { Prisma } from '@prisma/client';

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void => {
  let statusCode = 500;
  let message = 'Error interno del servidor';

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      statusCode = 409;
      message = 'El valor ya existe en la base de datos';
    } else if (err.code === 'P2025') {
      statusCode = 404;
      message = 'El recurso solicitado no fue encontrado';
    } else {
      statusCode = 400;
      message = 'Error en la base de datos';
    }
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    message = 'Error de validación en la base de datos';
  }

  if (statusCode === 500) {
    console.error('💥 Unexpected Error:', err);
  }

  res.status(statusCode).json({
    status: 'error',
    message,
    ...(env.NODE_ENV === 'development' ? { stack: err.stack } : {}),
  });
};
