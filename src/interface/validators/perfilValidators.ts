import { z } from 'zod';

export const updatePerfilSchema = z.object({
  body: z.object({
    nombre_completo: z.string().min(1, 'El nombre completo no puede estar vacío').optional(),
    avatar_url: z.string().url('La URL del avatar no es válida').or(z.literal('')).optional(),
  }),
});
