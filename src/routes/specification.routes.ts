import { Router } from 'express'
import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController'

const specifcationsRoutes = Router()

const createSpecificationController = new CreateSpecificationController()

specifcationsRoutes.post('/', createSpecificationController.handle)

export { specifcationsRoutes }
