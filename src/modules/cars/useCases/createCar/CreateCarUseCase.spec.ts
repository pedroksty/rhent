import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'
import { CreateCarUseCase } from './CreateCarUseCase'

let createCarUseCar: CreateCarUseCase
let carsRepository: CarsRepositoryInMemory

describe('Create Car', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory()
    createCarUseCar = new CreateCarUseCase(carsRepository)
  })

  it('Should be able to create a new car', async () => {
    await createCarUseCar.execute({
      name: 'Name car',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-4321',
      fine_amount: 60,
      brand: 'Brand car',
      category_id: 'category'
    })
  })
})
