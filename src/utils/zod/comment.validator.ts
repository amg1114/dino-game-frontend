import { z } from 'zod';

export const CommentValidator = z
  .string()
  .min(1, 'El comentario es obligatorio')
  .max(500, 'El comentario no puede tener más de 500 caracteres');
