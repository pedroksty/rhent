import { ICreateCarDTO } from '../dtos/ICreateCarDTO'
import { IFindAvaiableDTO } from '../dtos/IFindAvaiableDTO'
import { Car } from '../infra/typeorm/entities/Car'

export interface ICarsRepository {
   create(data: ICreateCarDTO): Promise<Car>
   findByLicencePlate(licensePlate: string): Promise<Car>
   findAvailable({ brand, name, category_id }: IFindAvaiableDTO): Promise<Car[]>
   findById(carId: string): Promise<Car>
   updateAvaiable(id: string, available: boolean): Promise<void>
}
