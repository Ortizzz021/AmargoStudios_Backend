import { ISeguimientoRepository } from '../../../domain/repositories/ISeguimientoRepository';
import { AppError } from '../../../shared/errors/AppError';

export class DeleteSeguimientoUseCase {
  constructor(private seguimientoRepository: ISeguimientoRepository) {}

  async execute(id: string, requestUser: { id: string; rol: string }): Promise<void> {
    const seguimiento = await this.seguimientoRepository.findById(id);
    if (!seguimiento) {
      throw AppError.notFound('Seguimiento');
    }

    if (requestUser.rol !== 'admin' && seguimiento.autor_id !== requestUser.id) {
      throw AppError.forbidden('No tienes permisos para eliminar este seguimiento');
    }

    await this.seguimientoRepository.delete(id);
  }
}
