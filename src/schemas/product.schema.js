import {z} from 'zod';

export const productSchema = z.object({
    name: z.string({
        required_error: 'El nombre del producto es requerido'
    }),

    price: z.number({
        required_error: 'El precio del producto es requerido'
    }).optional(),

    year: z.number({
        required_error: 'El año del producto es requerido'
    }).optional()
});