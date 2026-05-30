import { IClienteRepository } from '../../../domain/repositories/IClienteRepository';
import { ClienteFilterDto } from '../../dtos/cliente.dto';
import { Cliente } from '../../../domain/entities/Cliente';
import { parsePagination, PaginatedResponse } from '../../../shared/utils/pagination';

export class GetClientesUseCase {
  constructor(private clienteRepository: IClienteRepository) {}

  async execute(dto: ClienteFilterDto): Promise<PaginatedResponse<Cliente>> {
    const pagination = parsePagination(dto.page, dto.limit);

    return this.clienteRepository.findAll(
      {
        nombre: dto.nombre,
        empresa: dto.empresa,
      },
      pagination,
    );
  }
}
