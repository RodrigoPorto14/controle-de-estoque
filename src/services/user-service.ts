import { compare, hash } from  'bcryptjs';
import { sign } from 'jsonwebtoken';
import { UserCreate, UserShow, UserLogin, UserToken, UserUpdate, userShow } from "../models/user";
import { db } from "../utils/db-server"
import { User } from '@prisma/client';

export const createUser = async ({ name, email, password } : UserCreate) : Promise<UserShow> => 
{
    const user = await getUserByEmail(email);
    if(user)
        throw new Error("Email já existente");

    const passwordHash = await hash(password, 8);

    return db.user.create({ data: { name, email, password : passwordHash }, select: userShow });
}

export const loginUser = async ({ email, password } : UserLogin ) : Promise<UserToken> => 
{
    const user = await getUserByEmail(email);

    if(!user)
        throw new Error("Email não cadastrado");

    const passwordMatch = compare(password, user.password);

    if(!passwordMatch)
        throw new Error("Senha incorreta");

    const { id, name } = user;
    const token = sign(
        { name, email }, 
        process.env.JWT_SECRET as string, 
        {
            subject: id,
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    );

    return { id, name, email, token };
}

export const authenticatedUser = async (id : string) : Promise<UserShow> =>
    db.user.findUniqueOrThrow({ where: { id }, select: userShow });

export const updateUser = async (id : string, user : UserUpdate) : Promise<UserShow> =>
    db.user.update({ data: user, where: { id }, select: userShow });

const getUserByEmail = async (email : string) : Promise<User | null> =>
    db.user.findUnique({ where: { email }});

