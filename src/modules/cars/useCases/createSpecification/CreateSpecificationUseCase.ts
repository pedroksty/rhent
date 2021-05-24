
import { AppError } from '@errors/AppError'
import { inject, injectable } from 'tsyringe'
import { ISpecificationRepository } from '../../repositories/ISpecificationRepository'

interface IRequest {
  name: string
  description: string
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationRepository')
    private specificationsRepository: ISpecificationRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const specificatioAlreadyExists = await this.specificationsRepository.findByName(name)

    if (specificatioAlreadyExists) {
      throw new AppError('Speficiation already exists!', 400)
    }

    await this.specificationsRepository.create({
      name,
      description
    })
  }
}

export { CreateSpecificationUseCase }
