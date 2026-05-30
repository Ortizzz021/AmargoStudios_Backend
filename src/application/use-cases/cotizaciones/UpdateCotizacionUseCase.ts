import { ICotizacionRepository } from '../../../domain/repositories/ICotizacionRepository';
import { IPerfilRepository } from '../../../domain/repositories/IPerfilRepository';
import { UpdateCotizacionDto } from '../../dtos/cotizacion.dto';
import { CotizacionWithRelations, ESTADOS_COTIZACION } from '../../../domain/entities/Cotizacion';
import { AppError } from '../../../shared/errors/AppError';

export class UpdateCotizacionUseCase {
  constructor(
    private cotizacionRepository: ICotizacionRepository,
    private perfilRepository: IPerfilRepository
  ) {}

  async execute(id: string, dto: UpdateCotizacionDto): Promise<CotizacionWithRelations> {
    const cotizacion = await this.cotizacionRepository.findById(id);
    if (!cotizacion) {
      throw AppError.notFound('Cotización');
    }

    if (dto.estado) {
      const validStates = ESTADOS_COTIZACION as readonly string[];
      if (!validStates.includes(dto.estado)) {
        throw AppError.badRequest(`Estado inválido. Debe ser uno de: ${validStates.join(', ')}`);
      }
    }

    if (dto.asignado_a !== undefined) {
      if (dto.asignado_a !== null && dto.asignado_a !== '') {
        const perfil = await this.perfilRepository.findById(dto.asignado_a);
        if (!perfil) {
          throw AppError.notFound('Perfil asignado');
        }
      }
    }

    let fechaTentativa: Date | null | undefined = undefined;
    if (dto.fecha_tentativa !== undefined) {
      if (dto.fecha_tentativa === null || dto.fecha_tentativa === '') {
        fechaTentativa = null;
      } else {
        fechaTentativa = new Date(dto.fecha_tentativa);
        if (isNaN(fechaTentativa.getTime())) {
          throw AppError.badRequest('Fecha tentativa inválida');
        }
      }
    }

    return this.cotizacionRepository.update(id, {
      servicio: dto.servicio,
      mensaje: dto.mensaje === undefined ? undefined : (dto.mensaje || null),
      presupuesto_estimado: dto.presupuesto_estimado === undefined ? undefined : (dto.presupuesto_estimado || null),
      fecha_tentativa: fechaTentativa,
      estado: dto.estado,
      asignado_a: dto.asignado_a === undefined ? undefined : (dto.asignado_a || null),
    });
  }
}
