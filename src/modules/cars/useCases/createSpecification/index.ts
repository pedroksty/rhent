import { SpecificationRepository } from '@modules/cars/repositories/implementations/SpecificationRepository'
import { CreateSpecificationController } from './CreateSpecificationController'
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase'

const speficiationRepository = new SpecificationRepository()

const createSpecificationUseCase = new CreateSpecificationUseCase(speficiationRepository)

const createSpecificationController = new CreateSpecificationController(createSpecificationUseCase)

export { createSpecificationController }
