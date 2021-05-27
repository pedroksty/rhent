import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'
import { Category } from '@modules/cars/infra/typeorm/entities/Category'
import { ICarsRepository } from '../ICarsRepository'

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = []

  async findByLicencePlate(licensePlate: string): Promise<Car> {
    return this.cars.find(car => car.license_plate === licensePlate)
  }

  async create({ brand, category_id, daily_rate, description, name, fine_amount, license_plate }: ICreateCarDTO): Promise<Car> {
    const car = new Car()

    Object.assign(car, {
      name,
      description,
      brand,
      category_id,
      daily_rate,
      fine_amount,
      license_plate
    })

    this.cars.push(car)

    return car
  }
}

export { CarsRepositoryInMemory }
