import dayjs from 'dayjs'

import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory'
import { AppError } from '@shared/errors/AppError'
import { CreateRentalUseCase } from './CreateRentalUserCase'

let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory

describe('Create Rentals', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate()

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory)
  })

  it('Should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: '123456',
      car_id: '654321',
      expected_return_date: dayAdd24Hours
    })

    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('start_date')
  })

  it('Should not be able to create a new rental if there is another open to the same user', async () => {
    await createRentalUseCase.execute({
      user_id: '123456',
      car_id: '123456',
      expected_return_date: dayAdd24Hours
    })

    await expect(createRentalUseCase.execute({
      user_id: '123456',
      car_id: '654321',
      expected_return_date: dayAdd24Hours
    })).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to create a new rental if there is another open to the same car', async () => {
    await createRentalUseCase.execute({
      user_id: '1234578',
      car_id: '1212a',
      expected_return_date: dayAdd24Hours
    })

    await expect(createRentalUseCase.execute({
      user_id: '123456',
      car_id: '1212a',
      expected_return_date: dayAdd24Hours
    })).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to create a new rental with invalid return time', async () => {
    await expect(createRentalUseCase.execute({
      user_id: '123456',
      car_id: '1212a',
      expected_return_date: dayjs().toDate()
    })).rejects.toBeInstanceOf(AppError)
  })
})
