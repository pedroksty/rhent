import { getRepository, Repository } from 'typeorm'

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { Car } from '../entities/Car'
import { IFindAvaiableDTO } from '@modules/cars/dtos/IFindAvaiableDTO'

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>

  constructor() {
    this.repository = getRepository(Car)
  }


  async findById(carId: string): Promise<Car> {
    const car = await this.repository.findOne(carId)

    return car
  }

  async findAvailable({ brand, name, category_id }: IFindAvaiableDTO): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder('c')
      .where('available = :available', { available: true })

    if (brand) {
      carsQuery.andWhere('c.brand = :brand', { brand })
    }

    if (name) {
      carsQuery.andWhere('c.name = :name', { name })
    }

    if (category_id) {
      carsQuery.andWhere('c.category_id = :category_id', { category_id })
    }

    const cars = await carsQuery.getMany()

    return cars
  }

  async create({
    id,
    brand,
    name,
    category_id,
    license_plate,
    fine_amount,
    description,
    daily_rate,
    specifications
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      id,
      name,
      category_id,
      license_plate,
      fine_amount,
      description,
      daily_rate,
      brand,
      specifications
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

  async updateAvaiable(id: string, available: boolean): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ available })
      .where("id = :id")
      .setParameters({ id })
      .execute()
  }
}

export { CarsRepository }
