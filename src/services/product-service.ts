
import { ProductCreate, ProductShow, ProductUpdate, productShow } from "../models/product";
import { db } from "../utils/db-server";


export const createProduct = async (product : ProductCreate, file : any) : Promise<ProductShow> => {
    if(file)
        product.banner = file.filename;

    return db.product.create({ data: product, select: productShow });   
}

export const updateProduct = async (id : string, product : ProductUpdate, file : any) : Promise<ProductShow> => {
    if(file)
        product.banner = file.filename;

    return db.product.update({ data: product, where: { id }, select : productShow });
}

export const getProducts = async (query : any) : Promise<ProductShow[]> => {
    let queryOptions : any = { select : productShow };
    if(query.categoryId)
        queryOptions = {...queryOptions,  where : { category_id : query.categoryId }}

    return db.product.findMany(queryOptions);
}

export const deleteProduct = async (id : string) : Promise<void> => {
    await db.product.delete({ where : { id }});
}
    

