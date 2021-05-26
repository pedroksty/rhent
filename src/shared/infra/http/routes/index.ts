import { Router } from 'express'

import { authenticateRoutes } from './authenticate.routes'
import { categoriesRouter } from './categories.routes'
import { specifcationsRoutes } from './specification.routes'
import { usersRoutes } from './users.routes'

const router = Router()

router.use('/categories', categoriesRouter)
router.use('/specifications', specifcationsRoutes)
router.use('/users', usersRoutes)
router.use(authenticateRoutes)

router.get('/', (request, response) => {
  return response.json({ SERVER: 'ON' })
})

export { router }
