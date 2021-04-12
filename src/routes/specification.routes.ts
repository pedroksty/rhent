import { SpecificationRepository } from '@modules/cars/repositories/SpecificationRepository'
import { CreateSpecificationService } from '@modules/cars/services/CreateSpecificationService'
import { Router } from 'express'

const specifcationsRoutes = Router()

const speficiationsRepository = new SpecificationRepository()

specifcationsRoutes.post('/', (request, response) => {
  const { name, description } = request.body

  const createSpeficicationService = new CreateSpecificationService(speficiationsRepository)

  createSpeficicationService.execute({
    name,
    description
  })

  return response.status(201).send()
})

export { specifcationsRoutes }
