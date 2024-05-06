import { Product } from '@prisma/client';
import { z } from 'zod';

const name = z.string().min(3);
const price = z.string().regex(/^(\d+|\d+\.\d{1,2})$/, "Número decimal inválido");
const category_id = z.string().uuid();
const amount = z.string().transform(value => parseInt(value));
const description = z.string();
const banner = z.string().optional();

export const ProductCreateSchema = z.object({ name, price, category_id, amount, description: description.optional(), banner });
export const ProductUpdateSchema = z.object({ name, price, category_id, amount, description, banner });

export type ProductCreate = z.infer<typeof ProductCreateSchema>;
export type ProductUpdate = z.infer<typeof ProductUpdateSchema>;
export type ProductShow = Omit<Product, 'created_at' | 'updated_at'>;

export const productShow = {
    id: true,
    name: true,
    price: true,
    category_id: true,
    amount: true,
    description: true,
    banner: true
}

