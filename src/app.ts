import swaggerUI from 'swagger-ui-express'
import './shared/infra/typeorm'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import cors from 'cors'

import './shared/container'

import { AppError } from '@shared/errors/AppError'
import swaggerFile from './swagger.json'
import { router } from './shared/infra/http/routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile))

app.use(router)

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      mesage: err.message
    })
  }

  console.log(err)

  return response.status(500).json({
    status: 'error',
    message: `Inernal server error - ${err.message}`
  })
})

export { app }
