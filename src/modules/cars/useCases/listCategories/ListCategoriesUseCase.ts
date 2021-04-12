import { Category } from '@modules/cars/models/Category'
import { ICategorieRepository } from '@modules/cars/repositories/ICategoriesRepository'

class ListCategoriesUseCase {
  constructor (private categoriesRepository: ICategorieRepository) {

  }

  execute(): Category[] {
    const categories = this.categoriesRepository.list()

    return categories
  }
}

export { ListCategoriesUseCase }
