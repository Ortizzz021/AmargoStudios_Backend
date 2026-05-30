import { z } from 'zod';

export const createClienteSchema = z.object({
  body: z.object({
    nombre_completo: z
      .string({ required_error: 'El nombre completo es requerido' })
      .min(1, 'El nombre completo no puede estar vacío'),
    email: z
      .string({ required_error: 'El correo electrónico es requerido' })
      .email('El formato del correo electrónico no es válido'),
    telefono: z.string().optional(),
    empresa: z.string().optional(),
  }),
});

export const updateClienteSchema = z.object({
  body: z.object({
    nombre_completo: z.string().min(1, 'El nombre completo no puede estar vacío').optional(),
    email: z.string().email('El formato del correo electrónico no es válido').optional(),
    telefono: z.string().optional(),
    empresa: z.string().optional(),
  }),
});

export const getClientesQuerySchema = z.object({
  query: z.object({
    nombre: z.string().optional(),
    empresa: z.string().optional(),
    page: z.string().optional(),
    limit: z.string().optional(),
  }),
});
