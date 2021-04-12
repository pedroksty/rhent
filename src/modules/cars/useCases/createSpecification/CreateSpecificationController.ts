import { Request, Response } from 'express'
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase'

class CreateSpecificationController {
  constructor(private createSpecificationUsecase: CreateSpecificationUseCase) {}

  handle(request: Request, response: Response): Response {
    const { name, description } = request.body

    this.createSpecificationUsecase.execute({
      name,
      description
    })

    return response.status(201).send()
  }
}

export { CreateSpecificationController }
