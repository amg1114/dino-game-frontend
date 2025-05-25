import { z } from 'zod';

export const descuentoSchema = z.object({
    fechaInicio: z
        .string({
            required_error: 'La fecha de inicio es obligatoria',
        })
        .min(1, 'La fecha de inicio es obligatoria')
        .nonempty('La fecha de inicio no puede estar vacía')
        .date('La fecha de inicio no es válida')
        .refine((date) => {
            const today = new Date();
            const parsedDate = new Date(date);

            // Normaliza ambas fechas a medianoche
            today.setHours(0, 0, 0, 0);
            parsedDate.setHours(0, 0, 0, 0);

            return parsedDate >= today
        },
            {
                message: 'La fecha de inicio no puede ser igual o anterior a la fecha actual',
            }),
    fechaFin: z
        .string()
        .min(1, 'La fecha de finalización es obligatoria')
        .nonempty('La fecha de finalización no puede estar vacía')
        .date('La fecha de finalización no es válida'),


    porcentaje: z
        .number()
        .min(0, 'El porcentaje no puede ser negativo')
        .max(1, 'El porcentaje no puede ser mayor a 1 (100%)')
        .refine((value) => value > 0.0 && value <= 1.0, {
            message: 'El porcentaje debe estar mayor que 0 y menor o igual que 1 (0% a 100%)',
        }),


}).refine((data) => {
    if (!data.fechaFin || !data.fechaInicio) return true;
    const inicio = new Date(data.fechaInicio);
    const fin = new Date(data.fechaFin);
    inicio.setHours(0, 0, 0, 0);
    fin.setHours(0, 0, 0, 0);
    return fin > inicio;

}, {
    message: 'La fecha de finalización debe ser posterior a la fecha de inicio',
    path: ['fechaFin']
}
)