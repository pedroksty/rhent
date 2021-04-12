import { Router } from 'express'
import { categoriesRouter } from './categories.routes'
import { specifcationsRoutes } from './specification.routes'

const router = Router()

router.use('/categories', categoriesRouter)
router.use('/specifications', specifcationsRoutes)

export { router }
