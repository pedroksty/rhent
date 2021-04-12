import { Request, Response } from 'express'
import { CreateCategoryUseCase } from './CreateCategoryUseCase'

class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  handle(request: Request, response: Response): Response {
    console.log('handle')
    const { name, description } = request.body

    this.createCategoryUseCase.execute({
      name,
      description
    })

    console.log('handle23')

    return response.status(201).send()
  }
}

export { CreateCategoryController }
