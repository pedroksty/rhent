import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'
import { SpecificationInMemory } from '@modules/cars/repositories/in-memory/SpecificationInMemory'
import { AppError } from '@shared/errors/AppError'
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase'

let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory
let specificationRepositoryInMemory: SpecificationInMemory

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    specificationRepositoryInMemory = new SpecificationInMemory()
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationRepositoryInMemory)
  })

  it('should be able to add a new specification to a non-existent car', async () => {
    const car_id = '1234'
    const specifications_id = ['54321']

    await expect(createCarSpecificationUseCase.execute({
      car_id,
      specifications_id
    })).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to add a new specification to the car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Name car',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-4321',
      fine_amount: 60,
      brand: 'Brand car',
      category_id: 'category'
    })

    const specification = await specificationRepositoryInMemory.create({
      name: 'specification teste',
      description: 'description teste'
    })

    const specifications_id = [specification.id]

    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id
    })

    expect(specificationsCars).toHaveProperty('specifications')
    expect(specificationsCars.specifications.length).toBe(1)
  })
})
