import { Router } from 'express'
import { categoriesRouter } from './categories.routes'
import { specifcationsRoutes } from './specification.routes'
import { usersRoutes } from './users.routes'

const router = Router()

router.use('/categories', categoriesRouter)
router.use('/specifications', specifcationsRoutes)
router.use('/users', usersRoutes)

router.get('/', (request, response) => {
  return response.json({ SERVER: 'ON' })
})

export { router }
