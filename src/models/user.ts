import { z } from 'zod';
import { User } from '@prisma/client';

const name = z.string().min(6);
const email = z.string().email();
const password = z.string().min(8);

export const UserCreateSchema = z.object({ name, email, password });
export const UserUpdateSchema = z.object({ name: name.optional() });
export const UserLoginSchema = z.object({ email, password });

export type UserCreate = z.infer<typeof UserCreateSchema>;
export type UserUpdate = z.infer<typeof UserUpdateSchema>;
export type UserLogin = z.infer<typeof UserLoginSchema>;
export type UserShow = Pick<User, "id" | "name" | "email">;
export type UserToken = UserShow & { token: string };

export const userShow = { id: true, name: true, email: true };
