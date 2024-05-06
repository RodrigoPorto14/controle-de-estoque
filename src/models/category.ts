import { Category } from '@prisma/client';
import { z } from 'zod';

const name = z.string();

export const CategoryCreateSchema = z.object({ name });
export const CategoryUpdateSchema = z.object({ name });

export type CategoryCreate = z.infer<typeof CategoryCreateSchema>;
export type CategoryUpdate = z.infer<typeof CategoryUpdateSchema>;
export type CategoryShow = Pick<Category, "id" | "name">;
export const categoryShow = { id: true, name: true };