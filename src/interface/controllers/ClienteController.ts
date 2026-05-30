import { Request, Response, NextFunction } from 'express';
import { CreateClienteUseCase } from '../../application/use-cases/clientes/CreateClienteUseCase';
import { GetClientesUseCase } from '../../application/use-cases/clientes/GetClientesUseCase';
import { GetClienteByIdUseCase } from '../../application/use-cases/clientes/GetClienteByIdUseCase';
import { UpdateClienteUseCase } from '../../application/use-cases/clientes/UpdateClienteUseCase';
import { DeleteClienteUseCase } from '../../application/use-cases/clientes/DeleteClienteUseCase';

export class ClienteController {
  constructor(
    private createClienteUseCase: CreateClienteUseCase,
    private getClientesUseCase: GetClientesUseCase,
    private getClienteByIdUseCase: GetClienteByIdUseCase,
    private updateClienteUseCase: UpdateClienteUseCase,
    private deleteClienteUseCase: DeleteClienteUseCase,
  ) {}

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.createClienteUseCase.execute(req.body);
      res.status(201).json({
        status: 'success',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.getClientesUseCase.execute(req.query);
      res.status(200).json({
        status: 'success',
        data: result.data,
        meta: result.meta,
      });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.getClienteByIdUseCase.execute(req.params.id as string);
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
      const result = await this.updateClienteUseCase.execute(req.params.id as string, req.body);
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
      await this.deleteClienteUseCase.execute(req.params.id as string);
      res.status(200).json({
        status: 'success',
        message: 'Cliente eliminado correctamente',
      });
    } catch (error) {
      next(error);
    }
  };
}
