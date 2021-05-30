import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory'
import { AppError } from '@shared/errors/AppError'
import { CreateUserUseCase } from './CreateUserUseCase'

let createUserUseCase: CreateUserUseCase
let userRepositoryInMemory: UsersRepositoryInMemory

describe('Create User', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UsersRepositoryInMemory()
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
  })

  it('Should be able to create a user', async () => {
    await createUserUseCase.execute({
      name: 'testeName',
      email: 'teste@rentails.com.br',
      password: 'password',
      driver_license: 'ABC-12345'
    })

    const user = await userRepositoryInMemory.findByEmail('teste@rentails.com.br')

    expect(user).toHaveProperty('id')
  })

  it('Should not be able to create a user with same email', async () => {
    await createUserUseCase.execute({
      name: 'testeName',
      email: 'teste@rentails.com.br',
      password: 'password',
      driver_license: 'ABC-12345'
    })

    await expect(createUserUseCase.execute({
      name: 'testeName2',
      email: 'teste@rentails.com.br',
      password: 'password2',
      driver_license: 'ABC-54321'
    })).rejects.toBeInstanceOf(AppError)
  })
})
