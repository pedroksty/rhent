import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'
import { AppError } from '@shared/errors/AppError'
import { CreateCarUseCase } from './CreateCarUseCase'

let createCarUseCar: CreateCarUseCase
let carsRepository: CarsRepositoryInMemory

describe('Create Car', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory()
    createCarUseCar = new CreateCarUseCase(carsRepository)
  })

  it('Should be able to create a new car', async () => {
    const car = await createCarUseCar.execute({
      name: 'Name car',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-4321',
      fine_amount: 60,
      brand: 'Brand car',
      category_id: 'category'
    })

    expect(car).toHaveProperty('id')
  })

  it('Should not be able to create a new car with a exists licence plate ', async () => {
    await createCarUseCar.execute({
      name: 'Name car',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-4321',
      fine_amount: 60,
      brand: 'Brand car',
      category_id: 'category'
    })

    await expect(createCarUseCar.execute({
      name: 'Name car2',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-4321',
      fine_amount: 60,
      brand: 'Brand car',
      category_id: 'category'
    })).rejects.toEqual(new AppError('Car already exists'))
  })

  it('Should be able to create a car with available true by default', async () => {
    const car = await createCarUseCar.execute({
      name: 'Car avaiable',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-4321',
      fine_amount: 60,
      brand: 'Brand car',
      category_id: 'category'
    })

    expect(car.available).toBe(true)
  })
})
