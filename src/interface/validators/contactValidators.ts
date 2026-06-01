import { z } from 'zod';

export const submitContactSchema = z.object({
  body: z.object({
    nombre_completo: z.string().min(2, 'El nombre es requerido'),
    email: z.string().email('Correo electrónico inválido'),
    telefono: z.string().optional(),
    servicio: z.string().min(1, 'Selecciona un servicio'),
    mensaje: z.string().min(10, 'Describe tu proyecto (mínimo 10 caracteres)'),
    presupuesto_estimado: z.number().nonnegative('Debe ser un valor positivo').optional(),
    fecha_tentativa: z.string().optional(),
  }),
});
