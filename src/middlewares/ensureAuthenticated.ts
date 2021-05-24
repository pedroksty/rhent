import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import { UsersRepository } from '@modules/accounts/repositories/implementations/UserRepository'
import { AppError } from '@errors/AppError'

interface IPayload {
  sub: string
}

export async function ensureAuthenticate(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('Token missing', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub: userId } = verify(token, '5eda0eb8d9c5d08d84672dc52eb0fe47') as IPayload

    const usersRepository = new UsersRepository()
    const user = await usersRepository.findById(userId)

    if (!user) {
      throw new AppError('User does not exists!', 401)
    }

    next()
  } catch (err) {
    throw new AppError('Invalid token', 401)
  }
}
