import { z } from 'zod';

export const createSeguimientoSchema = z.object({
  body: z.object({
    cliente_id: z
      .string({ required_error: 'El ID del cliente es requerido' })
      .uuid('El ID del cliente debe ser un UUID válido'),
    contenido: z
      .string({ required_error: 'El contenido es requerido' })
      .min(1, 'El contenido no puede estar vacío'),
  }),
});
