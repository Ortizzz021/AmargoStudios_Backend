import { CotizacionWithRelations } from '../entities/Cotizacion';
import { PaginationParams, PaginatedResponse } from '../../shared/utils/pagination';

export interface CotizacionFilters {
  estado?: string;
  cliente_id?: string;
  fecha_desde?: Date;
  fecha_hasta?: Date;
}

export interface CreateCotizacionData {
  cliente_id: string;
  servicio: string;
  mensaje?: string | null;
  presupuesto_estimado?: number | null;
  fecha_tentativa?: Date | null;
}

export interface UpdateCotizacionData {
  servicio?: string;
  mensaje?: string | null;
  presupuesto_estimado?: number | null;
  fecha_tentativa?: Date | null;
  estado?: string;
  asignado_a?: string | null;
}

export interface ICotizacionRepository {
  findAll(
    filters: CotizacionFilters,
    pagination: PaginationParams,
  ): Promise<PaginatedResponse<CotizacionWithRelations>>;
  findById(id: string): Promise<CotizacionWithRelations | null>;
  create(data: CreateCotizacionData): Promise<CotizacionWithRelations>;
  update(id: string, data: UpdateCotizacionData): Promise<CotizacionWithRelations>;
  delete(id: string): Promise<void>;
}
