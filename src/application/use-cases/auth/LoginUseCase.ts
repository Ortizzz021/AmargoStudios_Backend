import bcrypt from 'bcryptjs';
import { IPerfilRepository } from '../../../domain/repositories/IPerfilRepository';
import { LoginDto, AuthResponseDto } from '../../dtos/auth.dto';
import { generateToken } from '../../../shared/utils/jwt';
import { AppError } from '../../../shared/errors/AppError';

export class LoginUseCase {
  constructor(private perfilRepository: IPerfilRepository) {}

  async execute(dto: LoginDto): Promise<AuthResponseDto> {
    const perfil = await this.perfilRepository.findByEmail(dto.email);
    if (!perfil) {
      throw AppError.unauthorized('Credenciales inválidas');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, perfil.password_hash);
    if (!isPasswordValid) {
      throw AppError.unauthorized('Credenciales inválidas');
    }

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
