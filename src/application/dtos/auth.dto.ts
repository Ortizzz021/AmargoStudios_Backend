import { PerfilPublic } from '../../domain/entities/Perfil';

export interface RegisterDto {
  email: string;
  password: string;
  nombre_completo: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponseDto {
  token: string;
  perfil: PerfilPublic;
}
