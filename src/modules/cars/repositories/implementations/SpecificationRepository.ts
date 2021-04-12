import { Specification } from '../../models/Specification'
import { ISpecificationRepository, ICreateSpecificationDTO } from '../ISpecificationRepository'

class SpecificationRepository implements ISpecificationRepository {
  private specifications: Specification[]

  constructor() {
    this.specifications = []
  }

  create ({ name, description }: ICreateSpecificationDTO) {
    const specifcation = new Specification()

    Object.assign(specifcation, {
      name,
      description,
      created_at: new Date()
    })

    this.specifications.push(specifcation)
  }

  findByName(name: string): Specification {
    const specification = this.specifications.find((specification) => specification.name === name)

    return specification
  }
}

export { SpecificationRepository }
