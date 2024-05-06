import { CategoryCreate, CategoryShow, CategoryUpdate } from "../models/category";
import { categoryShow } from "../models/category";
import { db } from "../utils/db-server"

export const getCategoryById = async (id : string) : Promise<CategoryShow> =>
   db.category.findUniqueOrThrow({ where: { id }, select: categoryShow });

export const getAllCategory = async () : Promise<CategoryShow[]> =>
    db.category.findMany({ select : categoryShow });

export const createCategory = async (category : CategoryCreate) : Promise<CategoryShow> =>
    db.category.create({ data: category, select: categoryShow })

export const updateCategory = async (id : string, category : CategoryUpdate) : Promise<CategoryShow> =>
    db.category.update({ data: category, where: { id }, select: categoryShow });

export const deleteCategory = async (id : string) : Promise<void> => {
    await db.category.delete({ where : { id }});
}