import { SeguimientoWithRelations } from '../../domain/entities/Seguimiento';
import {
  ISeguimientoRepository,
  CreateSeguimientoData,
} from '../../domain/repositories/ISeguimientoRepository';
import { prisma } from '../database/prisma';

export class PrismaSeguimientoRepository implements ISeguimientoRepository {
  private readonly include = {
    autor: {
      select: {
        id: true,
        nombre_completo: true,
        avatar_url: true,
      },
    },
    cliente: {
      select: {
        id: true,
        nombre_completo: true,
      },
    },
  };

  async findByClienteId(clienteId: string): Promise<SeguimientoWithRelations[]> {
    return prisma.seguimiento.findMany({
      where: { cliente_id: clienteId },
      include: this.include,
      orderBy: { fecha_creacion: 'desc' },
    });
  }

  async findById(id: string): Promise<SeguimientoWithRelations | null> {
    return prisma.seguimiento.findUnique({
      where: { id },
      include: this.include,
    });
  }

  async findLatest(limit: number): Promise<SeguimientoWithRelations[]> {
    return prisma.seguimiento.findMany({
      take: limit,
      include: this.include,
      orderBy: { fecha_creacion: 'desc' },
    });
  }

  async create(data: CreateSeguimientoData): Promise<SeguimientoWithRelations> {
    return prisma.seguimiento.create({
      data: {
        cliente_id: data.cliente_id,
        autor_id: data.autor_id,
        contenido: data.contenido,
      },
      include: this.include,
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.seguimiento.delete({
      where: { id },
    });
  }
}
