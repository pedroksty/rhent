import swaggerUI from 'swagger-ui-express'
import './database'

import './shared/container'

import express from 'express'
import cors from 'cors'

import { router } from './routes'
import swaggerFile from './swagger.json'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile))

app.use(router)

export { app }
