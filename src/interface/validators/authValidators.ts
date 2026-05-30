import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'El correo electrónico es requerido' })
      .email('El formato del correo electrónico no es válido'),
    password: z
      .string({ required_error: 'La contraseña es requerida' })
      .min(6, 'La contraseña debe tener al menos 6 caracteres'),
    nombre_completo: z
      .string({ required_error: 'El nombre completo es requerido' })
      .min(1, 'El nombre completo no puede estar vacío'),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'El correo electrónico es requerido' })
      .email('El formato del correo electrónico no es válido'),
    password: z
      .string({ required_error: 'La contraseña es requerida' })
      .min(1, 'La contraseña no puede estar vacía'),
  }),
});
