import { IClienteRepository } from '../../../domain/repositories/IClienteRepository';
import { UpdateClienteDto } from '../../dtos/cliente.dto';
import { Cliente } from '../../../domain/entities/Cliente';
import { AppError } from '../../../shared/errors/AppError';

export class UpdateClienteUseCase {
  constructor(private clienteRepository: IClienteRepository) {}

  async execute(id: string, dto: UpdateClienteDto): Promise<Cliente> {
    const cliente = await this.clienteRepository.findById(id);
    if (!cliente) {
      throw AppError.notFound('Cliente');
    }

    if (dto.email && dto.email !== cliente.email) {
      const existing = await this.clienteRepository.findByEmail(dto.email);
      if (existing) {
        throw AppError.conflict('Ya existe un cliente con ese correo electrónico');
      }
    }

    return this.clienteRepository.update(id, {
      nombre_completo: dto.nombre_completo,
      email: dto.email,
      telefono: dto.telefono === undefined ? undefined : (dto.telefono || null),
      empresa: dto.empresa === undefined ? undefined : (dto.empresa || null),
    });
  }
}
