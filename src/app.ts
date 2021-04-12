import express from 'express'
import cors from 'cors'
import { categoriesRouter } from './routes/categories.routes'
import { specifcationsRoutes } from 'routes/specification.routes'

import router from './routes'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/categories', categoriesRouter)
app.use('/specifications', specifcationsRoutes)

app.use(router)

export { app }
