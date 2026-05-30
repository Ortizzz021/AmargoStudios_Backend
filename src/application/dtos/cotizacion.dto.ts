export interface CreateCotizacionDto {
  cliente_id: string;
  servicio: string;
  mensaje?: string;
  presupuesto_estimado?: number;
  fecha_tentativa?: string;
}

export interface UpdateCotizacionDto {
  servicio?: string;
  mensaje?: string;
  presupuesto_estimado?: number;
  fecha_tentativa?: string;
  estado?: string;
  asignado_a?: string;
}

export interface CotizacionFilterDto {
  estado?: string;
  cliente_id?: string;
  fecha_desde?: string;
  fecha_hasta?: string;
  page?: string;
  limit?: string;
}
