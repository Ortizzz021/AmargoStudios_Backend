import { Request, Response, NextFunction } from 'express';
import { GetPerfilByIdUseCase } from '../../application/use-cases/perfiles/GetPerfilByIdUseCase';
import { UpdatePerfilUseCase } from '../../application/use-cases/perfiles/UpdatePerfilUseCase';
import { AppError } from '../../shared/errors/AppError';

export class PerfilController {
  constructor(
    private getPerfilByIdUseCase: GetPerfilByIdUseCase,
    private updatePerfilUseCase: UpdatePerfilUseCase,
  ) {}

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.getPerfilByIdUseCase.execute(req.params.id as string);
      res.status(200).json({
        status: 'success',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user) {
        throw AppError.unauthorized('No autenticado');
      }

      if (req.user.rol !== 'admin' && req.user.id !== req.params.id) {
        throw AppError.forbidden('No tienes permisos para modificar este perfil');
      }

      const result = await this.updatePerfilUseCase.execute(req.params.id as string, req.body);
      res.status(200).json({
        status: 'success',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}
