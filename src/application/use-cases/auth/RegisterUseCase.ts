import bcrypt from 'bcryptjs';
import { IPerfilRepository } from '../../../domain/repositories/IPerfilRepository';
import { RegisterDto, AuthResponseDto } from '../../dtos/auth.dto';
import { generateToken } from '../../../shared/utils/jwt';
import { AppError } from '../../../shared/errors/AppError';

export class RegisterUseCase {
  constructor(private perfilRepository: IPerfilRepository) {}

  async execute(dto: RegisterDto): Promise<AuthResponseDto> {
    const existing = await this.perfilRepository.findByEmail(dto.email);
    if (existing) {
      throw AppError.conflict('Ya existe un usuario con ese correo electrónico');
    }

    const password_hash = await bcrypt.hash(dto.password, 10);

    const perfil = await this.perfilRepository.create({
      email: dto.email,
      password_hash,
      nombre_completo: dto.nombre_completo,
    });

    const token = generateToken({
      id: perfil.id,
      email: perfil.email,
      rol: perfil.rol,
    });

    return {
      token,
      perfil: {
        id: perfil.id,
        email: perfil.email,
        nombre_completo: perfil.nombre_completo,
        rol: perfil.rol,
        avatar_url: perfil.avatar_url,
        fecha_creacion: perfil.fecha_creacion,
      },
    };
  }
}
