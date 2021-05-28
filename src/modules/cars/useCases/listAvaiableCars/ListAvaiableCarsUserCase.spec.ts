import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'
import { ListAvaiableCarsUseCase } from './ListAvaiableCarsUseCase'

let listAvaiableCarsUseCase: ListAvaiableCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('ListAvaiable Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listAvaiableCarsUseCase = new ListAvaiableCarsUseCase(carsRepositoryInMemory)
  })

  it('Should be able to listAvaiable all avaiable cars', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'car brand',
      name: 'Car name',
      category_id: 'category_id',
      license_plate: 'DLP-A2485',
      fine_amount: 100,
      description: 'Car description',
      daily_rate: 140.00
    })

    const cars = await listAvaiableCarsUseCase.execute({})

    expect(cars).toEqual([car])
  })

  it('Should be able to all avaiable cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'mercedes',
      name: 'Car name',
      category_id: 'category_id',
      license_plate: 'DLP-A2485',
      fine_amount: 100,
      description: 'Car description',
      daily_rate: 140.00
    })

    const cars = await listAvaiableCarsUseCase.execute({
      brand: 'mercedes'
    })

    expect(cars).toEqual([car])
  })

  it('Should be able to all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'mercedes',
      name: 'a45',
      category_id: 'category_id',
      license_plate: 'DLP-A2485',
      fine_amount: 100,
      description: 'Car description',
      daily_rate: 140.00
    })

    const cars = await listAvaiableCarsUseCase.execute({
      name: 'a45'
    })

    expect(cars).toEqual([car])
  })

  it('Should be able to list all avaiable cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'mercedes',
      name: 'a45',
      category_id: '12345',
      license_plate: 'DLP-A2485',
      fine_amount: 100,
      description: 'Car description',
      daily_rate: 140.00
    })

    const cars = await listAvaiableCarsUseCase.execute({
      category_id: '12345'
    })

    expect(cars).toEqual(car)
  })
})
