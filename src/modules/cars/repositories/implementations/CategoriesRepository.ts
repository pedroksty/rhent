import { Category } from '@modules/cars/entities/Category'
import { getRepository, Repository } from 'typeorm'
import { ICategorieRepository, ICreateCategoryDTO } from '../ICategoriesRepository'

class CategoriesRepository implements ICategorieRepository {
  private repository: Repository<Category>

  constructor() {
    this.repository = getRepository(Category)
  }

  // public static getInstance(): CategoriesRepository {
  //   if (!CategoriesRepository.INSTANCE) {
  //     CategoriesRepository.INSTANCE = new CategoriesRepository()
  //   }

  //   return CategoriesRepository.INSTANCE
  // }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      description,
      name
    })

    await this.repository.save(category)
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find()

    return categories
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({ name })

    return category
  }
}

export { CategoriesRepository }
