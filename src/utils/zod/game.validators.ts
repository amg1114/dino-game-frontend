import { z } from 'zod';
import { imageSchema, multipleImagesSchema, versionFileSchema } from './file.validators';

export const versionFormSchema = z.object({
  version: z.string().min(1, 'La versión es obligatoria').nonempty('La versión no puede estar vacía'),
  descripcion: z.string().min(1, 'La descripción es obligatoria').nonempty('La descripción no puede estar vacía'),
  requirements: z.array(z.string()).min(1, 'Los requisitos son obligatorios'),
  file: versionFileSchema,
});

export const gameFormSchema = z.object({
  titulo: z.string().min(1, 'El título es obligatorio').nonempty('El título no puede estar vacío'),
  descripcion: z.string().min(1, 'La descripción es obligatoria').nonempty('La descripción no puede estar vacía'),
  precio: z.number().nonnegative('El precio no puede ser negativo'),
  categorias: z.array(z.number()).min(1, 'Debes seleccionar al menos una categoría').max(3, 'Máximo 3 categorías'),
  thumb: imageSchema,
  hero: imageSchema,
  assets: multipleImagesSchema,
  version: z.array(versionFormSchema).min(1, 'Debes subir al menos una versión'),
});
