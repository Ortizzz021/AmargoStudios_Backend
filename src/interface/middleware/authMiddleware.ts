import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../../shared/utils/jwt';
import { AppError } from '../../shared/errors/AppError';

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(AppError.unauthorized('No se proporcionó token de autenticación'));
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return next(AppError.unauthorized('Formato de token inválido. Debe ser Bearer <token>'));
  }

  const token = parts[1];

  try {
    const payload = verifyToken(token);
    req.user = payload;
    next();
  } catch (error) {
    next(AppError.unauthorized('Token de autenticación inválido o expirado'));
  }
}
