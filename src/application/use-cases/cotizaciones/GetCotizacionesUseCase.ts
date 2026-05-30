import { ICotizacionRepository } from '../../../domain/repositories/ICotizacionRepository';
import { CotizacionFilterDto } from '../../dtos/cotizacion.dto';
import { CotizacionWithRelations } from '../../../domain/entities/Cotizacion';
import { parsePagination, PaginatedResponse } from '../../../shared/utils/pagination';
import { AppError } from '../../../shared/errors/AppError';

export class GetCotizacionesUseCase {
  constructor(private cotizacionRepository: ICotizacionRepository) {}

  async execute(dto: CotizacionFilterDto): Promise<PaginatedResponse<CotizacionWithRelations>> {
    const pagination = parsePagination(dto.page, dto.limit);

    let fechaDesde: Date | undefined = undefined;
    if (dto.fecha_desde) {
      fechaDesde = new Date(dto.fecha_desde);
      if (isNaN(fechaDesde.getTime())) {
        throw AppError.badRequest('fecha_desde inválida');
      }
    }

    let fechaHasta: Date | undefined = undefined;
    if (dto.fecha_hasta) {
      fechaHasta = new Date(dto.fecha_hasta);
      if (isNaN(fechaHasta.getTime())) {
        throw AppError.badRequest('fecha_hasta inválida');
      }
    }

    return this.cotizacionRepository.findAll(
      {
        estado: dto.estado,
        cliente_id: dto.cliente_id,
        fecha_desde: fechaDesde,
        fecha_hasta: fechaHasta,
      },
      pagination
    );
  }
}
