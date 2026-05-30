import { ISeguimientoRepository } from '../../../domain/repositories/ISeguimientoRepository';
import { IClienteRepository } from '../../../domain/repositories/IClienteRepository';
import { SeguimientoWithRelations } from '../../../domain/entities/Seguimiento';
import { AppError } from '../../../shared/errors/AppError';

export class GetSeguimientosByClienteUseCase {
  constructor(
    private seguimientoRepository: ISeguimientoRepository,
    private clienteRepository: IClienteRepository
  ) {}

  async execute(clienteId: string): Promise<SeguimientoWithRelations[]> {
    const cliente = await this.clienteRepository.findById(clienteId);
    if (!cliente) {
      throw AppError.notFound('Cliente');
    }

    return this.seguimientoRepository.findByClienteId(clienteId);
  }
}
