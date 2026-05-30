import { Perfil, PerfilPublic } from '../entities/Perfil';

export interface CreatePerfilData {
  email: string;
  password_hash: string;
  nombre_completo: string;
  rol?: string;
}

export interface UpdatePerfilData {
  nombre_completo?: string;
  avatar_url?: string | null;
}

export interface IPerfilRepository {
  findById(id: string): Promise<Perfil | null>;
  findByIdPublic(id: string): Promise<PerfilPublic | null>;
  findByEmail(email: string): Promise<Perfil | null>;
  create(data: CreatePerfilData): Promise<Perfil>;
  update(id: string, data: UpdatePerfilData): Promise<PerfilPublic>;
}
