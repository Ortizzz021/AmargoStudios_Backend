import { SeguimientoWithRelations } from '../entities/Seguimiento';

export interface CreateSeguimientoData {
  cliente_id: string;
  autor_id: string;
  contenido: string;
}

export interface ISeguimientoRepository {
  findByClienteId(clienteId: string): Promise<SeguimientoWithRelations[]>;
  findById(id: string): Promise<SeguimientoWithRelations | null>;
  findLatest(limit: number): Promise<SeguimientoWithRelations[]>;
  create(data: CreateSeguimientoData): Promise<SeguimientoWithRelations>;
  delete(id: string): Promise<void>;
}
