import { Router } from 'express'

import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController'
import { ensureAuthenticate } from '@shared/infra/http/middlewares/ensureAuthenticated'
import { ensureAdmin } from '../middlewares/ensureAdmin'

const specifcationsRoutes = Router()

const createSpecificationController = new CreateSpecificationController()

specifcationsRoutes.post('/', ensureAuthenticate, ensureAdmin, createSpecificationController.handle)

export { specifcationsRoutes }
