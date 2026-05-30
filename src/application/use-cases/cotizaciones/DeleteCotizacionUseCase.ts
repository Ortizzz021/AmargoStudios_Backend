import { ICotizacionRepository } from '../../../domain/repositories/ICotizacionRepository';
import { AppError } from '../../../shared/errors/AppError';

export class DeleteCotizacionUseCase {
  constructor(private cotizacionRepository: ICotizacionRepository) {}

  async execute(id: string): Promise<void> {
    const cotizacion = await this.cotizacionRepository.findById(id);
    if (!cotizacion) {
      throw AppError.notFound('Cotización');
    }

    await this.cotizacionRepository.delete(id);
  }
}
