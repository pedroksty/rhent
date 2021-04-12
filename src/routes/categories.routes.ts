import { Router } from 'express'
import { CategoriesRepository } from '@modules/cars/repositories/CategoriesRepository'
import { createCategoryController } from '@modules/cars/useCases/createCategory/'

const categoriesRouter = Router()
const categoriesRepository = new CategoriesRepository()

categoriesRouter.post('/', createCategoryController.handle)

categoriesRouter.get('/', (request, response) => {
  const categories = categoriesRepository.list()

  return response.json(categories)
})

export { categoriesRouter }
