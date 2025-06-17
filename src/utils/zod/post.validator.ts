import { z } from 'zod';
import { imageSchema } from './file.validators';

export const postFormSchema = z.object({
  titulo: z.string().min(1, { message: 'El título es obligatorio' }),
  descripcion: z
    .string()
    .transform((val) => val.replace(/<\/?[^>]+(>|$)/g, ''))
    .refine((val) => val.trim().length > 0, { message: 'La descripción es obligatoria' }),
  thumb: imageSchema,
});
