import { container } from 'tsyringe'

import { ICategorieRepository } from '@modules/cars/repositories/ICategoriesRepository'
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository'
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository'
import { SpecificationRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationRepository'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository'

container.registerSingleton<ICategorieRepository>('CategoriesRepository', CategoriesRepository)

container.registerSingleton<ISpecificationRepository>('SpecificationRepository', SpecificationRepository)

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository)
