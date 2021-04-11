import { CategoriesRepository } from '@modules/cars/repositories/CategoriesRepository'
import { Router } from 'express'
import { CreateCategoryService } from '@modules/cars/services/CreateCategoryService'

const categoriesRouter = Router()
const categoriesRepository = new CategoriesRepository()

categoriesRouter.post('/', (request, response) => {
  const { name, description } = request.body

  const createCategoryService = new CreateCategoryService(categoriesRepository)

  const category = createCategoryService.execute({
    name,
    description
  })

  return response.status(201).json(category)
})

categoriesRouter.get('/', (request, response) => {
  const categories = categoriesRepository.list()

  return response.json(categories)
})

export { categoriesRouter }
