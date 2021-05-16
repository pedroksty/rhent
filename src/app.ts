import express from 'express'
import swaggerUI from 'swagger-ui-express'
import cors from 'cors'

import swaggerFile from './swagger.json'
import { router } from './routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile))

app.use(router)

export { app }
