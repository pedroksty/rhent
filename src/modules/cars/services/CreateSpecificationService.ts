import { ISpecificationRepository } from '../repositories/ISpecificationRepository'

interface IRequest {
  name: string
  description: string
}

class CreateSpecificationService {
  constructor(private specificationsRepository: ISpecificationRepository) {}

  execute({ name, description }: IRequest): void {
    const specificatioAlreadyExists = this.specificationsRepository.findByName(name)

    if (specificatioAlreadyExists) {
      throw new Error('Speficiation already exists!')
    }

    this.specificationsRepository.create({
      name,
      description
    })
  }
}

export { CreateSpecificationService }
