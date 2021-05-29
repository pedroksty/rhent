import { container } from 'tsyringe'

import { ICategorieRepository } from '@modules/cars/repositories/ICategoriesRepository'
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository'
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository'
import { SpecificationRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationRepository'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository'
import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImageRepository'
import { CarsImagesRepository } from '@modules/cars/infra/typeorm/repositories/CarsImagesRepository'

container.registerSingleton<ICategorieRepository>('CategoriesRepository', CategoriesRepository)

container.registerSingleton<ISpecificationRepository>('SpecificationRepository', SpecificationRepository)

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository)

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository)

container.registerSingleton<ICarsImagesRepository>('CarsImagesRepository', CarsImagesRepository)
