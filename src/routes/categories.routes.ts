import { Router } from 'express'

import { createCategoryController } from '@modules/cars/useCases/createCategory/'
import { listCategoriesController } from '@modules/cars/useCases/listCategories'

const categoriesRouter = Router()

categoriesRouter.post('/', createCategoryController.handle)

categoriesRouter.get('/', listCategoriesController.handle)

export { categoriesRouter }
