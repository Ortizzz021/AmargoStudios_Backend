import { Cliente } from '../entities/Cliente';
import { PaginationParams, PaginatedResponse } from '../../shared/utils/pagination';

export interface ClienteFilters {
  nombre?: string;
  empresa?: string;
}

export interface CreateClienteData {
  nombre_completo: string;
  email: string;
  telefono?: string | null;
  empresa?: string | null;
}

export interface UpdateClienteData {
  nombre_completo?: string;
  email?: string;
  telefono?: string | null;
  empresa?: string | null;
}

export interface IClienteRepository {
  findAll(filters: ClienteFilters, pagination: PaginationParams): Promise<PaginatedResponse<Cliente>>;
  findById(id: string): Promise<Cliente | null>;
  findByEmail(email: string): Promise<Cliente | null>;
  create(data: CreateClienteData): Promise<Cliente>;
  update(id: string, data: UpdateClienteData): Promise<Cliente>;
  delete(id: string): Promise<void>;
}
