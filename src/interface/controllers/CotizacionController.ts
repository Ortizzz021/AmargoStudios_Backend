import { Request, Response, NextFunction } from 'express';
import { CreateCotizacionUseCase } from '../../application/use-cases/cotizaciones/CreateCotizacionUseCase';
import { GetCotizacionesUseCase } from '../../application/use-cases/cotizaciones/GetCotizacionesUseCase';
import { GetCotizacionByIdUseCase } from '../../application/use-cases/cotizaciones/GetCotizacionByIdUseCase';
import { UpdateCotizacionUseCase } from '../../application/use-cases/cotizaciones/UpdateCotizacionUseCase';
import { DeleteCotizacionUseCase } from '../../application/use-cases/cotizaciones/DeleteCotizacionUseCase';

export class CotizacionController {
  constructor(
    private createCotizacionUseCase: CreateCotizacionUseCase,
    private getCotizacionesUseCase: GetCotizacionesUseCase,
    private getCotizacionByIdUseCase: GetCotizacionByIdUseCase,
    private updateCotizacionUseCase: UpdateCotizacionUseCase,
    private deleteCotizacionUseCase: DeleteCotizacionUseCase,
  ) {}

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.createCotizacionUseCase.execute(req.body);
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
      const result = await this.getCotizacionesUseCase.execute(req.query);
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
      const result = await this.getCotizacionByIdUseCase.execute(req.params.id as string);
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
      const result = await this.updateCotizacionUseCase.execute(req.params.id as string, req.body);
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
      await this.deleteCotizacionUseCase.execute(req.params.id as string);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
