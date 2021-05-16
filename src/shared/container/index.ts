import { container } from 'tsyringe'

import { ICategorieRepository } from '@modules/cars/repositories/ICategoriesRepository'
import { CategoriesRepository } from '@modules/cars/repositories/implementations/CategoriesRepository'
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository'
import { SpecificationRepository } from '@modules/cars/repositories/implementations/SpecificationRepository'

//
container.registerSingleton<ICategorieRepository>('CategoriesRepository', CategoriesRepository)

container.registerSingleton<ISpecificationRepository>('SpecificationRepository', SpecificationRepository)
