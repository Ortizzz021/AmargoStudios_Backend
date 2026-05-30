import { Perfil, PerfilPublic } from '../../domain/entities/Perfil';
import {
  IPerfilRepository,
  CreatePerfilData,
  UpdatePerfilData,
} from '../../domain/repositories/IPerfilRepository';
import { prisma } from '../database/prisma';

export class PrismaPerfilRepository implements IPerfilRepository {
  private mapToPublic(dbModel: Perfil): PerfilPublic {
    const { password_hash, ...publicFields } = dbModel;
    return publicFields;
  }

  async findById(id: string): Promise<Perfil | null> {
    return prisma.perfil.findUnique({
      where: { id },
    });
  }

  async findByIdPublic(id: string): Promise<PerfilPublic | null> {
    const perfil = await prisma.perfil.findUnique({
      where: { id },
    });
    return perfil ? this.mapToPublic(perfil) : null;
  }

  async findByEmail(email: string): Promise<Perfil | null> {
    return prisma.perfil.findUnique({
      where: { email },
    });
  }

  async create(data: CreatePerfilData): Promise<Perfil> {
    return prisma.perfil.create({
      data: {
        email: data.email,
        password_hash: data.password_hash,
        nombre_completo: data.nombre_completo,
        rol: data.rol,
      },
    });
  }

  async update(id: string, data: UpdatePerfilData): Promise<PerfilPublic> {
    const updated = await prisma.perfil.update({
      where: { id },
      data: {
        nombre_completo: data.nombre_completo,
        avatar_url: data.avatar_url,
      },
    });
    return this.mapToPublic(updated);
  }
}
