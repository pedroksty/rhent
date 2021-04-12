import { Category } from '@modules/cars/models/Category'
import { ICreateCategoryDTO } from '../ICategoriesRepository'

class CategoriesRepository {
  private categories: Category[]

  private static INSTANCE: CategoriesRepository

  private constructor() {
    this.categories = []
  }

  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository()
    }

    console.log('rea')

    return CategoriesRepository.INSTANCE
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