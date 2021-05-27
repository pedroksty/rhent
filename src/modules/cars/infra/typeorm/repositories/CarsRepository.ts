import { getRepository, Repository } from 'typeorm'

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { Car } from '../entities/Car'

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>

  constructor() {
    this.repository = getRepository(Car)
  }

  async create({
    brand,
    name,
    category_id,
    license_plate,
    fine_amount,
    description,
    daily_rate
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      category_id,
      license_plate,
      fine_amount,
      description,
      daily_rate,
      brand
    })

    await this.repository.save(car)

    return car
  }

  async findByLicencePlate(licensePlate: string): Promise<Car> {
    const car = await this.repository.findOne({
      license_plate: licensePlate
    })

    return car
  }
}

export { CarsRepository }
