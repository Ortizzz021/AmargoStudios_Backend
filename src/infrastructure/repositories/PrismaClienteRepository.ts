import { Cliente } from '../../domain/entities/Cliente';
import {
  IClienteRepository,
  ClienteFilters,
  CreateClienteData,
  UpdateClienteData,
} from '../../domain/repositories/IClienteRepository';
import { PaginationParams, PaginatedResponse, calculateSkip, buildPaginatedResponse } from '../../shared/utils/pagination';
import { prisma } from '../database/prisma';
import { Prisma } from '@prisma/client';

export class PrismaClienteRepository implements IClienteRepository {
  async findAll(filters: ClienteFilters, pagination: PaginationParams): Promise<PaginatedResponse<Cliente>> {
    const where: Prisma.ClienteWhereInput = {};

    if (filters.nombre) {
      where.nombre_completo = {
        contains: filters.nombre,
        mode: 'insensitive',
      };
    }

    if (filters.empresa) {
      where.empresa = {
        contains: filters.empresa,
        mode: 'insensitive',
      };
    }

    const skip = calculateSkip(pagination);
    const take = pagination.limit;

    const [total, data] = await Promise.all([
      prisma.cliente.count({ where }),
      prisma.cliente.findMany({
        where,
        skip,
        take,
        orderBy: {
          fecha_creacion: 'desc',
        },
      }),
    ]);

    return buildPaginatedResponse(data, total, pagination);
  }

  async findById(id: string): Promise<Cliente | null> {
    return prisma.cliente.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<Cliente | null> {
    return prisma.cliente.findUnique({
      where: { email },
    });
  }

  async create(data: CreateClienteData): Promise<Cliente> {
    return prisma.cliente.create({
      data: {
        nombre_completo: data.nombre_completo,
        email: data.email,
        telefono: data.telefono,
        empresa: data.empresa,
      },
    });
  }

  async update(id: string, data: UpdateClienteData): Promise<Cliente> {
    return prisma.cliente.update({
      where: { id },
      data: {
        nombre_completo: data.nombre_completo,
        email: data.email,
        telefono: data.telefono,
        empresa: data.empresa,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.cliente.delete({
      where: { id },
    });
  }
}
