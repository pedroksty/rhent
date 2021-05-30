import { Router } from 'express'

import { authenticateRoutes } from './authenticate.routes'
import { carsRoutes } from './cars.routes'
import { categoriesRouter } from './categories.routes'
import { rentalRoutes } from './rental.routes'
import { specificationsRoutes } from './specification.routes'
import { usersRoutes } from './users.routes'

const router = Router()

router.use('/categories', categoriesRouter)
router.use('/specifications', specificationsRoutes)
router.use('/users', usersRoutes)
router.use('/cars', carsRoutes)
router.use('/rentals', rentalRoutes)
router.use(authenticateRoutes)

router.get('/', (request, response) => {
  return response.json({ SERVER: 'ON' })
})

export { router }
