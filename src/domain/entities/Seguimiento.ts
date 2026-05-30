export interface Seguimiento {
  id: string;
  cliente_id: string;
  autor_id: string;
  contenido: string;
  fecha_creacion: Date;
}

export interface SeguimientoWithRelations extends Seguimiento {
  autor?: {
    id: string;
    nombre_completo: string;
    avatar_url: string | null;
  };
  cliente?: {
    id: string;
    nombre_completo: string;
  };
}
