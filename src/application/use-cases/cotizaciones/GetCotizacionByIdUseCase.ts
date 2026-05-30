import { ICotizacionRepository } from '../../../domain/repositories/ICotizacionRepository';
import { CotizacionWithRelations } from '../../../domain/entities/Cotizacion';
import { AppError } from '../../../shared/errors/AppError';

export class GetCotizacionByIdUseCase {
  constructor(private cotizacionRepository: ICotizacionRepository) {}

  async execute(id: string): Promise<CotizacionWithRelations> {
    const cotizacion = await this.cotizacionRepository.findById(id);
    if (!cotizacion) {
      throw AppError.notFound('Cotización');
    }
    return cotizacion;
  }
}
