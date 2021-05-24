import { Category } from '@modules/cars/entities/Category'
import { ICategorieRepository, ICreateCategoryDTO } from '../ICategoriesRepository'

class CategoriesRepositoryInMemory implements ICategorieRepository {
  categories: Category[] = []

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find(category => category.name === name)

    return category
  }

  async list(): Promise<Category[]> {
    const categories = this.categories

    return categories
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category()

    Object.assign(category, {
      name,
      description
    })

    this.categories.push(category)
  }
}

export { CategoriesRepositoryInMemory }