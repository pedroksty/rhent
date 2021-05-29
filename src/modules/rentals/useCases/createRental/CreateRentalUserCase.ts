import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'
import { AppError } from '@shared/errors/AppError'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'

interface IRequest {
  user_id: string
  car_id: string
  expected_return_date: Date
}

class CreateRentalUseCase {
  constructor(
    private rentalsRepository: IRentalsRepository,
    private dateProvider: IDateProvider
  ) {}

  async execute({ user_id, car_id, expected_return_date }: IRequest): Promise<Rental> {
    const minimumRentalHour = 24

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCarId(car_id)

    if (carUnavailable) {
      throw new AppError('Car is unavailable', 400)
    }

    const rentalOpenToUser = await this.rentalsRepository.findOneOpenRentalByUser(user_id)

    if (rentalOpenToUser) {
      throw new AppError('Theres a rental in progress for  user!', 400)
    }

    const dateNow = this.dateProvider.dateNow()

    const compare = this.dateProvider.compareInHours(dateNow, expected_return_date)

    if (compare < minimumRentalHour) {
      throw new AppError('Invalid return time!', 400)
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date
    })

    return rental
  }
}

export { CreateRentalUseCase }
