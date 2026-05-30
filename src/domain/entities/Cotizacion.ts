export interface Cotizacion {
  id: string;
  cliente_id: string;
  servicio: string;
  mensaje: string | null;
  presupuesto_estimado: number | null;
  fecha_tentativa: Date | null;
  estado: string;
  asignado_a: string | null;
  fecha_creacion: Date;
}

export interface CotizacionWithRelations extends Cotizacion {
  cliente?: {
    id: string;
    nombre_completo: string;
    email: string;
    empresa: string | null;
  };
  perfil?: {
    id: string;
    nombre_completo: string;
    email: string;
  } | null;
}

export const ESTADOS_COTIZACION = [
  'pendiente',
  'en_proceso',
  'aprobada',
  'rechazada',
  'completada',
] as const;

export type EstadoCotizacion = (typeof ESTADOS_COTIZACION)[number];
