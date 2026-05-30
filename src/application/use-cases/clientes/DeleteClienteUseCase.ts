import { IClienteRepository } from '../../../domain/repositories/IClienteRepository';
import { AppError } from '../../../shared/errors/AppError';

export class DeleteClienteUseCase {
  constructor(private clienteRepository: IClienteRepository) {}

  async execute(id: string): Promise<void> {
    const cliente = await this.clienteRepository.findById(id);
    if (!cliente) {
      throw AppError.notFound('Cliente');
    }

    await this.clienteRepository.delete(id);
  }
}
