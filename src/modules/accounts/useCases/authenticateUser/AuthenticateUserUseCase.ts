import { inject, injectable } from 'tsyringe'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { AppError } from '@shared/errors/AppError'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: {
    name: string
    email: string
  }
  token: string

}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Email incorrect', 401)
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError('Password incorrect', 401)
    }

    const token = sign({}, '5eda0eb8d9c5d08d84672dc52eb0fe47', {
      subject: user.id,
      expiresIn: '1d'
    })

    return {
      user: {
        name: user.name,
        email: user.email
      },
      token
    }
  }
}

export { AuthenticateUserUseCase }
