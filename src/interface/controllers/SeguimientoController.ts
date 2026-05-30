import { Request, Response, NextFunction } from 'express';
import { CreateSeguimientoUseCase } from '../../application/use-cases/seguimiento/CreateSeguimientoUseCase';
import { GetSeguimientosByClienteUseCase } from '../../application/use-cases/seguimiento/GetSeguimientosByClienteUseCase';
import { DeleteSeguimientoUseCase } from '../../application/use-cases/seguimiento/DeleteSeguimientoUseCase';
import { AppError } from '../../shared/errors/AppError';

export class SeguimientoController {
  constructor(
    private createSeguimientoUseCase: CreateSeguimientoUseCase,
    private getSeguimientosByClienteUseCase: GetSeguimientosByClienteUseCase,
    private deleteSeguimientoUseCase: DeleteSeguimientoUseCase,
  ) {}

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user) {
        throw AppError.unauthorized('No autenticado');
      }
      const result = await this.createSeguimientoUseCase.execute(req.body, req.user.id);
      res.status(201).json({
        status: 'success',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  getByCliente = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const clienteId = req.query.cliente_id as string;
      if (!clienteId) {
        throw AppError.badRequest('El parámetro cliente_id es requerido');
      }

      const result = await this.getSeguimientosByClienteUseCase.execute(clienteId);
      res.status(200).json({
        status: 'success',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user) {
        throw AppError.unauthorized('No autenticado');
      }
      await this.deleteSeguimientoUseCase.execute(req.params.id as string, {
        id: req.user.id,
        rol: req.user.rol,
      });
      res.status(200).json({
        status: 'success',
        message: 'Seguimiento eliminado correctamente',
      });
    } catch (error) {
      next(error);
    }
  };
}
