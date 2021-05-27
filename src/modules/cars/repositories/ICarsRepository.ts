import { ICreateCarDTO } from '../dtos/ICreateCarDTO'
import { Car } from '../infra/typeorm/entities/Car'

export interface ICarsRepository {
   create(data: ICreateCarDTO): Promise<Car>
   findByLicencePlate(licensePlate: string): Promise<Car>
}