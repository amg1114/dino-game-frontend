import { z } from 'zod';

export const InputFormsSchema = z.object({
  titulo: z.string().min(1, 'El título es obligatorio').nonempty('El título no puede estar vacío'),

  descripcion: z.string().min(1, 'La descripción es obligatoria').nonempty('La descripción no puede estar vacía'),
});
