import { IPerfilRepository } from '../../../domain/repositories/IPerfilRepository';
import { UpdatePerfilDto } from '../../dtos/perfil.dto';
import { PerfilPublic } from '../../../domain/entities/Perfil';
import { AppError } from '../../../shared/errors/AppError';

export class UpdatePerfilUseCase {
  constructor(private perfilRepository: IPerfilRepository) {}

  async execute(id: string, dto: UpdatePerfilDto): Promise<PerfilPublic> {
    const perfil = await this.perfilRepository.findById(id);
    if (!perfil) {
      throw AppError.notFound('Perfil');
    }

    return this.perfilRepository.update(id, {
      nombre_completo: dto.nombre_completo,
      avatar_url: dto.avatar_url === undefined ? undefined : (dto.avatar_url || null),
    });
  }
}
