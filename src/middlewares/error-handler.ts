import { Request, Response, NextFunction } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import { ZodError } from 'zod';
import { NotFoundError, PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => 
{
    console.log(error.constructor.name)
    if(error instanceof ZodError)
    {
        const errors = error.issues.map(issue => { return { path: issue.path, message: issue.message } });
        return res.status(422).json({ error : { name: 'Erro de validação', errors } });
    }

    if(error instanceof NotFoundError || error instanceof PrismaClientKnownRequestError)
        return res.status(404).json({ error });

    if(error instanceof JsonWebTokenError)
        return res.status(401).json({ error });

    if(error instanceof Error)
        return res.status(400).json({ error : { message : error.message } });
         
        
    return res.status(500).json(
    { 
        status: 'error',
        message: 'Internal Server Error',
        error,
    });
}