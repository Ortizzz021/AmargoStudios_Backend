import { IClienteRepository } from '../../../domain/repositories/IClienteRepository';
import { CreateClienteDto } from '../../dtos/cliente.dto';
import { Cliente } from '../../../domain/entities/Cliente';
import { AppError } from '../../../shared/errors/AppError';

export class CreateClienteUseCase {
  constructor(private clienteRepository: IClienteRepository) {}

  async execute(dto: CreateClienteDto): Promise<Cliente> {
    const existing = await this.clienteRepository.findByEmail(dto.email);
    if (existing) {
      throw AppError.conflict('Ya existe un cliente con ese correo electrónico');
    }

    return this.clienteRepository.create({
      nombre_completo: dto.nombre_completo,
      email: dto.email,
      telefono: dto.telefono || null,
      empresa: dto.empresa || null,
    });
  }
}
