import { inject, injectable } from 'tsyringe'

import { ICategorieRepository } from '@modules/cars/repositories/ICategoriesRepository'

interface IRequest {
  name: string
  description: string
}

@injectable()
class CreateCategoryUseCase {
  constructor (
    @inject('CategoriesRepository')
    private categoriesRepository: ICategorieRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(name)

    if (categoryAlreadyExists) {
      throw new Error('Category alredy exists!')
    }

    await this.categoriesRepository.create({
      name,
      description
    })
  }
}

export { CreateCategoryUseCase }
