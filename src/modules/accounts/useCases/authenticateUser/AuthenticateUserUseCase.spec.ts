import { AppError } from '@shared/errors/AppError'
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO'
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory'
import { CreateUserUseCase } from '../createuser/CreateUserUseCase'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

let authenticateUserUseCase: AuthenticateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let createUserUseCase: CreateUserUseCase

describe('Authenticate user', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory)
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  })

  it('It should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '0012234',
      name: 'Teste testing',
      email: 'teste@teste.com.br',
      password: '12345678'
    }

    await createUserUseCase.execute(user)

    const authenticateUser = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    })

    expect(authenticateUser).toHaveProperty('token')
  })

  it('It should not be able to authenticate a nonexistent user', async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'false@email.com',
        password: 'falsePassword'
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('It should not be able to authenticate with incorrect password', async () => {
    const user: ICreateUserDTO = {
      driver_license: '0012234',
      name: 'Teste testing',
      email: 'teste@teste.com.br',
      password: '12345678'
    }

    await createUserUseCase.execute(user)

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: 'incorrectPassword'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
