import { ISeguimientoRepository } from '../../../domain/repositories/ISeguimientoRepository';
import { IClienteRepository } from '../../../domain/repositories/IClienteRepository';
import { IPerfilRepository } from '../../../domain/repositories/IPerfilRepository';
import { CreateSeguimientoDto } from '../../dtos/seguimiento.dto';
import { SeguimientoWithRelations } from '../../../domain/entities/Seguimiento';
import { AppError } from '../../../shared/errors/AppError';

export class CreateSeguimientoUseCase {
  constructor(
    private seguimientoRepository: ISeguimientoRepository,
    private clienteRepository: IClienteRepository,
    private perfilRepository: IPerfilRepository
  ) {}

  async execute(dto: CreateSeguimientoDto, autorId: string): Promise<SeguimientoWithRelations> {
    const cliente = await this.clienteRepository.findById(dto.cliente_id);
    if (!cliente) {
      throw AppError.notFound('Cliente');
    }

    const autor = await this.perfilRepository.findById(autorId);
    if (!autor) {
      throw AppError.notFound('Autor');
    }

    return this.seguimientoRepository.create({
      cliente_id: dto.cliente_id,
      autor_id: autorId,
      contenido: dto.contenido,
    });
  }
}
