export interface SubmitContactDto {
  nombre_completo: string;
  email: string;
  telefono?: string;
  servicio: string;
  mensaje: string;
  presupuesto_estimado?: number;
  fecha_tentativa?: string;
}
