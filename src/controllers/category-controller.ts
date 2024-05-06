import { Request, Response, Router } from "express";
import { createCategory, deleteCategory, getAllCategory, getCategoryById, updateCategory } from "../services/category-service";
import { CategoryCreate, CategoryCreateSchema, CategoryUpdate, CategoryUpdateSchema } from "../models/category";

const CATEGORY_ENDPOINT = '/categories';
const router = Router();

router.get(`${CATEGORY_ENDPOINT}/:id`, async (req : Request, res : Response) => {
    const category = await getCategoryById(req.params.id);
    return res.json(category);
})

router.get(CATEGORY_ENDPOINT, async (req : Request, res : Response) => {
    const categories = await getAllCategory();
    return res.json(categories);
})

router.post(CATEGORY_ENDPOINT, async (req : Request, res : Response) => {
    const categoryRequest : CategoryCreate = CategoryCreateSchema.parse(req.body);
    const category = await createCategory(categoryRequest);
    return res.json(category);
})

router.put(`${CATEGORY_ENDPOINT}/:id`, async (req : Request, res : Response) => {
    const categoryRequest : CategoryUpdate = CategoryUpdateSchema.parse(req.body);
    const category = await updateCategory(req.params.id, categoryRequest);
    return res.json(category);
})

router.delete(`${CATEGORY_ENDPOINT}/:id`, async (req : Request, res : Response) => {
    await deleteCategory(req.params.id);
    return res.status(204).end();
})

export default router;



