import { Request, Response, NextFunction } from 'express';
import { SubmitContactUseCase } from '../../application/use-cases/contact/SubmitContactUseCase';

export class ContactController {
  constructor(private submitContactUseCase: SubmitContactUseCase) {}

  submit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.submitContactUseCase.execute(req.body);
      res.status(201).json({
        status: 'success',
        data: result,
        message: 'Solicitud de cotización enviada correctamente',
      });
    } catch (error) {
      next(error);
    }
  };
}
