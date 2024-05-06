import { Request, Response, Router } from "express";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../services/product-service";
import { ProductCreate, ProductCreateSchema, ProductShow, ProductUpdate, ProductUpdateSchema } from "../models/product";
import { authenticate } from "../middlewares/auth";
import multer from 'multer';
import uploadConfig from '../config/multer';

const upload = multer(uploadConfig.upload("./tmp"));
const PRODUCT_ENDPOINT = '/products';
const router = Router();

router.post(PRODUCT_ENDPOINT, authenticate, upload.single("file"), async (req : Request, res : Response) => {
    const productReq : ProductCreate = ProductCreateSchema.parse(req.body);
    const product = await createProduct(productReq, req.file);
    return res.json(product);
});

router.put(`${PRODUCT_ENDPOINT}/:id`, authenticate, upload.single("file"), async (req : Request, res : Response) => {
    const productReq : ProductUpdate = ProductUpdateSchema.parse(req.body);
    const product = await updateProduct(req.params.id, productReq, req.file);
    return res.json(product);
});

router.get(PRODUCT_ENDPOINT, authenticate, async (req : Request, res : Response) => {
    const products : ProductShow[] = await getProducts(req.query);
    return res.json(products);
});

router.delete(`${PRODUCT_ENDPOINT}/:id`, authenticate, async (req : Request, res : Response) => {
    await deleteProduct(req.params.id);
    return res.status(204).end();
})


export default router;



