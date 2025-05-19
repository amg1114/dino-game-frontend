import { z } from 'zod';

const ALLOWED_IMAGES = ['image/png', 'image/jpeg', 'image/jpg'];
const MAX_SIZE = 10 * 1024 * 1024; // 10MB
const EXPECTED_ASPECT_RATIO = 16 / 9; // 16:9
const MAX_FILES = 4; // Max number of files

async function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.src = url;
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = (err) => reject(err);
  });
}

const versionFileSchema = z
  .custom<File | null>()
  .refine((file) => file !== null, {
    message: 'Debes subir un archivo.',
  })
  .superRefine(async (file, ctx) => {
    if (!file) return;
    // Validar tamaño
    if (file.size > MAX_SIZE) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'El archivo debe pesar menos de 10MB.',
      });
    }
    // Validar tipo MIME
    if (!file.type.startsWith('application/')) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Solo se permiten archivos.',
      });
      return;
    }
    if (!['application/zip', 'application/x-zip-compressed'].includes(file.type)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Formato de archivo no permitido. Solo se permiten ZIP.',
      });
    }
  });

const imageSchema = z
  .custom<File | null>()
  .refine((file) => file !== null, {
    message: 'Debes subir una imagen.',
  })
  .superRefine(async (file, ctx) => {
    if (!file) return;

    // Validar tamaño
    if (file.size > MAX_SIZE) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Cada imagen debe pesar menos de 10MB.',
      });
    }

    // Validar tipo MIME
    if (!file.type.startsWith('image/')) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Solo se permiten imágenes.',
      });
      return;
    }

    if (!ALLOWED_IMAGES.includes(file.type)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Formato de imagen no permitido. Solo se permiten PNG, JPG JPEG.',
      });
    }

    // Validar aspect ratio
    try {
      const image = await loadImage(file);
      const aspectRatio = image.width / image.height;
      if (Math.abs(aspectRatio - EXPECTED_ASPECT_RATIO) > 0.01) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'La imagen debe tener una relación de aspecto de 16:9.',
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Error al cargar la imagen.',
      });
    }
  });

const multipleImagesSchema = z
  .custom<FileList | null>()
  .transform((fileList) => (fileList ? Array.from(fileList) : [])) // Convertir FileList a File[]
  .refine((files) => files && files.length === MAX_FILES, {
    message: `Debes subir exactamente ${MAX_FILES} imágenes.`,
  })
  .superRefine(async (files, ctx) => {
    for (let i = 0; i < files.length; i++) {
      const result = await imageSchema.safeParseAsync(files[i]);
      if (!result.success) {
        result.error.issues.forEach((issue) => {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Image ${i + 1}: ${issue.message}`,
          });
        });
      }
    }
  });

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
