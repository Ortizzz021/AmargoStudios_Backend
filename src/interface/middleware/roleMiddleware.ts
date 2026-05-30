import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../shared/errors/AppError';

export function roleMiddleware(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(AppError.unauthorized('No autenticado'));
    }

    if (!allowedRoles.includes(req.user.rol)) {
      return next(AppError.forbidden('No tienes permisos suficientes para realizar esta acción'));
    }

    next();
  };
}
