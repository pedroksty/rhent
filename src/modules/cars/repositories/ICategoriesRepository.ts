import { Category } from '@modules/cars/infra/typeorm/entities/Category'

interface ICreateCategoryDTO {
  name: string
  description: string
}

interface ICategorieRepository {
  findByName(name:string): Promise<Category>
  list(): Promise<Category[]>
  create({ name, description }: ICreateCategoryDTO): Promise<void>
}

export { ICreateCategoryDTO, ICategorieRepository }
