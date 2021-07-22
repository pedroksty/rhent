import dayjs from 'dayjs'

import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory'
import { AppError } from '@shared/errors/AppError'
import { CreateRentalUseCase } from './CreateRentalUserCase'
import { DayJsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayJsDateProvider'
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'

let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let carsRepositoryInMemory: CarsRepositoryInMemory
let dayJsProvider: DayJsDateProvider


describe('Create Rentals', () => {
  const dayAdd24Hours = dayjs().add(2, 'day').toDate()

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    dayJsProvider = new DayJsDateProvider()
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayJsProvider, carsRepositoryInMemory)
  })

  it('Should be able to create a new rental', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'test',
      description: "car test",
      daily_rate: 100,
      license_plate: 'test',
      brand: "brand",
      category_id: "1234",
      fine_amount: 40
    })

    const rental = await createRentalUseCase.execute({
      user_id: '123456',
      car_id: car.id,
      expected_return_date: dayAdd24Hours
    })

    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('start_date')
  })

  it('Should not be able to create a new rental if there is another open to the same user', async () => {
    const primaryCar = await carsRepositoryInMemory.create({
      name: 'test',
      description: "car test",
      daily_rate: 100,
      license_plate: 'test',
      brand: "brand",
      category_id: "1234",
      fine_amount: 40,
      id: '123456'
    })

    const secondCar = await carsRepositoryInMemory.create({
      name: 'test',
      description: "car test",
      daily_rate: 100,
      license_plate: 'test',
      brand: "brand",
      category_id: "1234",
      fine_amount: 40,
      id: '654321'
    })

    await createRentalUseCase.execute({
      user_id: '123456',
      car_id: primaryCar.id,
      expected_return_date: dayAdd24Hours
    })

    await expect(createRentalUseCase.execute({
      user_id: '123456',
      car_id: secondCar.id,
      expected_return_date: dayAdd24Hours
    })).rejects.toEqual(new AppError('Theres a rental in progress for  user!'))
  })

  it('Should not be able to create a new rental if there is another open to the same car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'test',
      description: "car test",
      daily_rate: 100,
      license_plate: 'test',
      brand: "brand",
      category_id: "1234",
      fine_amount: 40
    })

    await createRentalUseCase.execute({
      user_id: '1234578',
      car_id: car.id,
      expected_return_date: dayAdd24Hours
    })

    await expect(createRentalUseCase.execute({
      user_id: '123456',
      car_id: car.id,
      expected_return_date: dayAdd24Hours
    })).rejects.toEqual(new AppError('Car is unavailable'))
  })

  it('Should not be able to create a new rental with invalid return time', async () => {
    await expect(createRentalUseCase.execute({
      user_id: '123456',
      car_id: '1212a',
      expected_return_date: dayjs().toDate()
    })).rejects.toEqual(new AppError('Invalid return time!'))
  })
})
