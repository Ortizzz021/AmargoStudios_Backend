import { z } from 'zod';

export const createCotizacionSchema = z.object({
  body: z.object({
    cliente_id: z.string({ required_error: 'El ID del cliente es requerido' }).uuid('El ID del cliente debe ser un UUID válido'),
    servicio: z.string({ required_error: 'El servicio es requerido' }).min(1, 'El servicio no puede estar vacío'),
    mensaje: z.string().optional(),
    presupuesto_estimado: z.number().nonnegative('El presupuesto debe ser un número positivo').optional(),
    fecha_tentativa: z.string().datetime({ precision: 0, offset: true }).or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)).optional(),
  }),
});

export const updateCotizacionSchema = z.object({
  params: z.object({
    id: z.string().uuid('El ID de la cotización debe ser un UUID válido'),
  }),
  body: z.object({
    servicio: z.string().min(1, 'El servicio no puede estar vacío').optional(),
    mensaje: z.string().optional(),
    presupuesto_estimado: z.number().nonnegative('El presupuesto debe ser un número positivo').optional(),
    fecha_tentativa: z.string().datetime({ precision: 0, offset: true }).or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)).or(z.literal('')).optional(),
    estado: z.string().optional(),
    asignado_a: z.string().uuid('El ID del perfil asignado debe ser un UUID válido').or(z.literal('')).optional(),
  }),
});

export const getCotizacionesQuerySchema = z.object({
  query: z.object({
    estado: z.string().optional(),
    cliente_id: z.string().uuid('El ID del cliente debe ser un UUID válido').optional(),
    fecha_desde: z.string().optional(),
    fecha_hasta: z.string().optional(),
    page: z.string().optional(),
    limit: z.string().optional(),
  }),
});
