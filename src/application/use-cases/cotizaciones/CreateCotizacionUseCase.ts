import { ICotizacionRepository } from '../../../domain/repositories/ICotizacionRepository';
import { IClienteRepository } from '../../../domain/repositories/IClienteRepository';
import { CreateCotizacionDto } from '../../dtos/cotizacion.dto';
import { CotizacionWithRelations } from '../../../domain/entities/Cotizacion';
import { AppError } from '../../../shared/errors/AppError';

export class CreateCotizacionUseCase {
  constructor(
    private cotizacionRepository: ICotizacionRepository,
    private clienteRepository: IClienteRepository
  ) {}

  async execute(dto: CreateCotizacionDto): Promise<CotizacionWithRelations> {
    const cliente = await this.clienteRepository.findById(dto.cliente_id);
    if (!cliente) {
      throw AppError.notFound('Cliente');
    }

    const fechaTentativa = dto.fecha_tentativa ? new Date(dto.fecha_tentativa) : null;
    if (fechaTentativa && isNaN(fechaTentativa.getTime())) {
      throw AppError.badRequest('Fecha tentativa inválida');
    }

    return this.cotizacionRepository.create({
      cliente_id: dto.cliente_id,
      servicio: dto.servicio,
      mensaje: dto.mensaje || null,
      presupuesto_estimado: dto.presupuesto_estimado || null,
      fecha_tentativa: fechaTentativa,
    });
  }
}
