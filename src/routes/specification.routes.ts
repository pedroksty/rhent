import { Router } from 'express'

import { createSpecificationController } from '@modules/cars/useCases/createSpecification'

const specifcationsRoutes = Router()

specifcationsRoutes.post('/', (request, response) => {
  return createSpecificationController.handle(request, response)
})

export { specifcationsRoutes }
