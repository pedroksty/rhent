import request from 'supertest'
import { Connection } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'
import { hash } from 'bcryptjs'

import { app } from '../../../../app'
import createConnection from '@shared/infra/typeorm/index'

let connection: Connection
describe(('List categories'), () => {
  beforeEach(async () => {
    connection = await createConnection()
    await connection.runMigrations()

    const id = uuidV4()
    const password = await hash('admin', 8)

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license )
        values('${id}', 'admin', 'admin@rentails.com.br', '${password}', true, 'now', 'XXXXXXX')
        `
    )
  })

  afterEach(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it('Should be able to create list category', async () => {
    const response = await request(app).get('/categories')

    expect(response.status).toBe(200)
  })
})
