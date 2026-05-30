export interface Cliente {
  id: string;
  nombre_completo: string;
  email: string;
  telefono: string | null;
  empresa: string | null;
  fecha_creacion: Date;
}
