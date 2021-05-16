import { Router } from 'express'
import { categoriesRouter } from './categories.routes'
import { specifcationsRoutes } from './specification.routes'

const router = Router()

router.use('/categories', categoriesRouter)
router.use('/specifications', specifcationsRoutes)

router.get('/', (request, response) => {
  return response.json({ SERVER: 'ON' })
})

export { router }
