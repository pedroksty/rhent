import { Category } from '@modules/cars/models/Category'

interface ICreateCategoryDTO {
  name: string
  description: string
}

interface ICategorieRepository {
  findByName(name:string): Category
  list(): Category[]
  create({ name, description }: ICreateCategoryDTO): Category
}

export { ICreateCategoryDTO, ICategorieRepository }
