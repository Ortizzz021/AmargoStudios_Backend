import { IPerfilRepository } from '../../../domain/repositories/IPerfilRepository';
import { PerfilPublic } from '../../../domain/entities/Perfil';
import { AppError } from '../../../shared/errors/AppError';

export class GetPerfilByIdUseCase {
  constructor(private perfilRepository: IPerfilRepository) {}

  async execute(id: string): Promise<PerfilPublic> {
    const perfil = await this.perfilRepository.findByIdPublic(id);
    if (!perfil) {
      throw AppError.notFound('Perfil');
    }
    return perfil;
  }
}
