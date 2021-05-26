import { Router } from 'express'

import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController'
import { ensureAuthenticate } from '@shared/infra/http/middlewares/ensureAuthenticated'

const specifcationsRoutes = Router()

const createSpecificationController = new CreateSpecificationController()

specifcationsRoutes.use(ensureAuthenticate)

specifcationsRoutes.post('/', createSpecificationController.handle)

export { specifcationsRoutes }
