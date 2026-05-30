export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(statusCode: number, message: string, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Object.setPrototypeOf(this, AppError.prototype);
  }

  static badRequest(message: string): AppError {
    return new AppError(400, message);
  }

  static unauthorized(message: string = 'No autorizado'): AppError {
    return new AppError(401, message);
  }

  static forbidden(message: string = 'No tienes permisos para esta acción'): AppError {
    return new AppError(403, message);
  }

  static notFound(resource: string = 'Recurso'): AppError {
    return new AppError(404, `${resource} no encontrado`);
  }

  static conflict(message: string): AppError {
    return new AppError(409, message);
  }

  static internal(message: string = 'Error interno del servidor'): AppError {
    return new AppError(500, message, false);
  }
}
