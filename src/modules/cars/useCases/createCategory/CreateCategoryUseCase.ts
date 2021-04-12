import { Category } from '@modules/cars/models/Category'
import { ICategorieRepository } from '@modules/cars/repositories/ICategoriesRepository'

interface IRequest {
  name: string
  description: string
}

class CreateCategoryUseCase {
  constructor (private categoriesRepository: ICategorieRepository) {}

  execute({ name, description }: IRequest): Category {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name)

    if (categoryAlreadyExists) {
      throw new Error('Category alredy exists!')
    }

    const category = this.categoriesRepository.create({
      name,
      description
    })

    return category
  }
}

export { CreateCategoryUseCase }
