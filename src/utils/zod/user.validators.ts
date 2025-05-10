import { z } from 'zod';

const MINIMUM_AGE = 16;

export const userSchema = z.object({
  nombre: z.string().min(1, 'El nombre es obligatorio'),
  fechaNacimiento: z
    .string()
    .min(1, 'La fecha de nacimiento es obligatoria')
    .date('La fecha de nacimiento no es válida')
    .refine(
      (date) => {
        const today = new Date();
        const parsedDate = new Date(date);
        const age = today.getFullYear() - parsedDate.getFullYear();

        const hasHadBirthdayThisYear =
          today.getMonth() > parsedDate.getMonth() ||
          (today.getMonth() === parsedDate.getMonth() && today.getDate() >= parsedDate.getDate());

        const actualAge = hasHadBirthdayThisYear ? age : age - 1;

        return actualAge >= MINIMUM_AGE;
      },
      {
        message: `Debes tener al menos ${MINIMUM_AGE} años.`,
      }
    ),
  pais: z.string().min(1, 'El país es obligatorio'),
  sexo: z.string().min(1, 'El género es obligatorio'),
  correo: z.string().email('Correo electrónico inválido'),
});

export const userWithPasswordSchema = userSchema.extend({
  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .refine((value) => /[A-Z]/.test(value), {
      message: 'La contraseña debe tener al menos una letra mayúscula',
    })
    .refine((value) => /[a-z]/.test(value), {
      message: 'La contraseña debe tener al menos una letra minúscula',
    })
    .refine((value) => /[0-9]/.test(value), {
      message: 'La contraseña debe tener al menos un número',
    })
    .refine((value) => /[^A-Za-z0-9]/.test(value), {
      message: 'La contraseña debe tener al menos un carácter especial',
    }),
});
