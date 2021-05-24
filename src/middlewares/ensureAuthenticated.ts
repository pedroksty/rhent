import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import { UsersRepository } from '@modules/accounts/repositories/implementations/UserRepository'

interface IPayload {
  sub: string
}

export async function ensureAuthenticate(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new Error('Token missing')
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub: userId } = verify(token, '5eda0eb8d9c5d08d84672dc52eb0fe47') as IPayload

    const usersRepository = new UsersRepository()
    const user = await usersRepository.findById(userId)

    if (!user) {
      throw new Error('User does not exists!')
    }

    next()
  } catch (err) {
    throw new Error('invalid token')
  }
}
