import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO'
import { IFindAvaiableDTO } from '@modules/cars/dtos/IFindAvaiableDTO'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'
import { ICarsRepository } from '../ICarsRepository'

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = []

  async findById(carId: string): Promise<Car> {
    return this.cars.find((car) => car.id === carId)
  }

  async findAvailable({ name, brand, category_id }: IFindAvaiableDTO): Promise<Car[]> {
    const cars = this.cars
      .filter(car => {
        if (car.available === true || ((brand && car.brand === brand) ||
        (category_id && car.category_id === category_id) ||
        (name && car.name === name))) {
          return car
        }

        return null
      })

    return cars
  }

  async findByLicencePlate(licensePlate: string): Promise<Car> {
    return this.cars.find(car => car.license_plate === licensePlate)
  }

  async create({ brand, category_id, daily_rate, description, name, fine_amount, license_plate, id }: ICreateCarDTO): Promise<Car> {
    const car = new Car()

    Object.assign(car, {
      id,
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
