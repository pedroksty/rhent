import { Category } from '@modules/cars/models/Category'
import { ICreateCategoryDTO } from './ICategoriesRepository'

class CategoriesRepository {
  private categories: Category[]

  constructor() {
    this.categories = []
  }

  create({ name, description }: ICreateCategoryDTO): Category {
    const category = new Category()

    Object.assign(category, {
      name,
      description,
      create_at: new Date()

    })

    this.categories.push(category)

    return category
  }

  list(): Category[] {
    return this.categories
  }

  findByName(name: string): Category {
    const category = this.categories.find(category => category.name === name)

    return category
  }
}

export { CategoriesRepository }
