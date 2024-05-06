import { Request, Response, NextFunction } from "express";
import { Secret, verify } from "jsonwebtoken";

type Payload = {
    sub : string;
}

export const authenticate = (req : Request, res : Response, next : NextFunction) => {
    const authToken = req.headers.authorization;

    if(!authToken)
        return res.status(401).json({ error: "Token não existente" });

    const [tag, token] = authToken.split(' ');

    const { sub } = verify(token, process.env.JWT_SECRET as Secret) as Payload;
    req.userId = sub;
    next();
}