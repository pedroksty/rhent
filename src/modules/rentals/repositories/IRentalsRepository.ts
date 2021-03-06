import { ICreateRentalDTO } from '../dtos/ICreateRentalDTO'
import { Rental } from '../infra/typeorm/entities/Rental'

export interface IRentalsRepository {
  findOpenRentalByCarId(car_id: string): Promise<Rental>
  findOneOpenRentalByUser(user_id: string): Promise<Rental>
  create({ car_id, user_id, expected_return_date }: ICreateRentalDTO): Promise<Rental>
}
