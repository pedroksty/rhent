import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'
import { getRepository, Repository } from 'typeorm'
import { Rental } from '../entities/Rental'

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>

  constructor() {
    this.repository = getRepository(Rental)
  }
  async findById(id: string): Promise<Rental> {
    const rental = await this.repository.findOne(id)

    return rental
  }

  async findOpenRentalByCarId(car_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({ car_id, end_date: null })

    return rental
  }

  async findOneOpenRentalByUser(user_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({ user_id, end_date: null })

    return rental
  }

  async create({ car_id, user_id, expected_return_date, id, end_date, total }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      expected_return_date,
      user_id,
      id,
      end_date,
      total
    })

    await this.repository.save(rental)

    return rental
  }
}

export { RentalsRepository }
