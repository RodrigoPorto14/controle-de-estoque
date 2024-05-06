import { Router } from 'express';
import userController from './controllers/user-controller'
import categoryController from './controllers/category-controller'
import productController from './controllers/product-controller'


const api = Router()
  .use(userController)
  .use(categoryController)
  .use(productController)

export default Router().use('/api', api);