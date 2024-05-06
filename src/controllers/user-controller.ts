import { Request, Response, Router } from "express";
import { authenticatedUser, createUser, loginUser, updateUser } from "../services/user-service";
import { UserCreate, UserCreateSchema, UserLogin, UserLoginSchema, UserUpdate, UserUpdateSchema } from "../models/user";
import { authenticate } from "../middlewares/auth";

const router = Router();

router.post('/register', async (req : Request, res : Response) => {
    const userRequest : UserCreate = UserCreateSchema.parse(req.body);
    const user = await createUser(userRequest);
    return res.json(user);
})

router.post('/login', async (req : Request, res : Response) => {
    const userRequest : UserLogin = UserLoginSchema.parse(req.body);
    const user = await loginUser(userRequest);
    return res.json(user);
})

router.get('/authenticated', authenticate, async (req : Request, res : Response) => {
    const user = await authenticatedUser(req.userId);
    return res.json(user);
})

router.put('/user', authenticate, async (req : Request, res : Response) => {
    const userRequest : UserUpdate = UserUpdateSchema.parse(req.body);
    const user = await updateUser(req.userId, userRequest);
    return res.json(user);
})

export default router;