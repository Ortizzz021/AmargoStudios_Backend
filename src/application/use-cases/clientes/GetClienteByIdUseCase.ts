import { IClienteRepository } from '../../../domain/repositories/IClienteRepository';
import { Cliente } from '../../../domain/entities/Cliente';
import { AppError } from '../../../shared/errors/AppError';

export class GetClienteByIdUseCase {
  constructor(private clienteRepository: IClienteRepository) {}

  async execute(id: string): Promise<Cliente> {
    const cliente = await this.clienteRepository.findById(id);
    if (!cliente) {
      throw AppError.notFound('Cliente');
    }
    return cliente;
  }
}
