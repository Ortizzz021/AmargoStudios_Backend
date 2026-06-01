import { CotizacionWithRelations } from '../../domain/entities/Cotizacion';
import {
  ICotizacionRepository,
  CotizacionFilters,
  CreateCotizacionData,
  UpdateCotizacionData,
} from '../../domain/repositories/ICotizacionRepository';
import { PaginationParams, PaginatedResponse, calculateSkip, buildPaginationMeta } from '../../shared/utils/pagination';
import { prisma } from '../database/prisma';
import { Prisma } from '@prisma/client';

type PrismaCotizacionWithRelations = Prisma.CotizacionGetPayload<{
  include: {
    cliente: { select: { id: true; nombre_completo: true; email: true; empresa: true } };
    perfil: { select: { id: true; nombre_completo: true; email: true } };
  };
}>;

export class PrismaCotizacionRepository implements ICotizacionRepository {
  private mapToEntity(dbModel: PrismaCotizacionWithRelations): CotizacionWithRelations {
    return {
      id: dbModel.id,
      cliente_id: dbModel.cliente_id,
      servicio: dbModel.servicio,
      mensaje: dbModel.mensaje,
      presupuesto_estimado: dbModel.presupuesto_estimado ? Number(dbModel.presupuesto_estimado.toString()) : null,
      fecha_tentativa: dbModel.fecha_tentativa,
      estado: dbModel.estado,
      asignado_a: dbModel.asignado_a,
      fecha_creacion: dbModel.fecha_creacion,
      cliente: dbModel.cliente
        ? {
            id: dbModel.cliente.id,
            nombre_completo: dbModel.cliente.nombre_completo,
            email: dbModel.cliente.email,
            empresa: dbModel.cliente.empresa,
          }
        : undefined,
      perfil: dbModel.perfil
        ? {
            id: dbModel.perfil.id,
            nombre_completo: dbModel.perfil.nombre_completo,
            email: dbModel.perfil.email,
          }
        : null,
    };
  }

  async findAll(
    filters: CotizacionFilters,
    pagination: PaginationParams,
  ): Promise<PaginatedResponse<CotizacionWithRelations>> {
    const where: Prisma.CotizacionWhereInput = {};

    if (filters.estado) {
      where.estado = filters.estado;
    }

    if (filters.cliente_id) {
      where.cliente_id = filters.cliente_id;
    }

    if (filters.fecha_desde || filters.fecha_hasta) {
      where.fecha_creacion = {};
      if (filters.fecha_desde) {
        where.fecha_creacion.gte = filters.fecha_desde;
      }
      if (filters.fecha_hasta) {
        where.fecha_creacion.lte = filters.fecha_hasta;
      }
    }

    const skip = calculateSkip(pagination);
    const take = pagination.limit;

    const include = {
      cliente: {
        select: {
          id: true,
          nombre_completo: true,
          email: true,
          empresa: true,
        },
      },
      perfil: {
        select: {
          id: true,
          nombre_completo: true,
          email: true,
        },
      },
    };

    const [total, data] = await Promise.all([
      prisma.cotizacion.count({ where }),
      prisma.cotizacion.findMany({
        where,
        skip,
        take,
        include,
        orderBy: {
          fecha_creacion: 'desc',
        },
      }),
    ]);

    return {
      data: data.map((item) => this.mapToEntity(item)),
      meta: buildPaginationMeta(total, pagination),
    };
  }

  async findById(id: string): Promise<CotizacionWithRelations | null> {
    const include = {
      cliente: {
        select: {
          id: true,
          nombre_completo: true,
          email: true,
          empresa: true,
        },
      },
      perfil: {
        select: {
          id: true,
          nombre_completo: true,
          email: true,
        },
      },
    };

    const dbModel = await prisma.cotizacion.findUnique({
      where: { id },
      include,
    });

    return dbModel ? this.mapToEntity(dbModel) : null;
  }

  async create(data: CreateCotizacionData): Promise<CotizacionWithRelations> {
    const include = {
      cliente: {
        select: {
          id: true,
          nombre_completo: true,
          email: true,
          empresa: true,
        },
      },
      perfil: {
        select: {
          id: true,
          nombre_completo: true,
          email: true,
        },
      },
    };

    const dbModel = await prisma.cotizacion.create({
      data: {
        cliente_id: data.cliente_id,
        servicio: data.servicio,
        mensaje: data.mensaje,
        presupuesto_estimado: data.presupuesto_estimado,
        fecha_tentativa: data.fecha_tentativa,
      },
      include,
    });

    return this.mapToEntity(dbModel);
  }

  async update(id: string, data: UpdateCotizacionData): Promise<CotizacionWithRelations> {
    const include = {
      cliente: {
        select: {
          id: true,
          nombre_completo: true,
          email: true,
          empresa: true,
        },
      },
      perfil: {
        select: {
          id: true,
          nombre_completo: true,
          email: true,
        },
      },
    };

    const dbModel = await prisma.cotizacion.update({
      where: { id },
      data: {
        servicio: data.servicio,
        mensaje: data.mensaje,
        presupuesto_estimado: data.presupuesto_estimado,
        fecha_tentativa: data.fecha_tentativa,
        estado: data.estado,
        asignado_a: data.asignado_a,
      },
      include,
    });

    return this.mapToEntity(dbModel);
  }

  async delete(id: string): Promise<void> {
    await prisma.cotizacion.delete({
      where: { id },
    });
  }
}
