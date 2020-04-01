const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe("INCIDENT", () => {
  beforeEach(async () => {
    await connection.migrate.rollback()
    await connection.migrate.latest()
  })

  afterAll(async () => {
    await connection.destroy()
  })

  describe("POST", () => {
    it('should be able to create a new INCIDENT', async () => {
      const ongResponse = await request(app)
        .post('/ongs')
        .send({
          name:"APAD",
          email:"contato@teste.com",
          whatsapp:"4700000000",
          city:"Rio Sul",
          uf:"SC"
        })

      const response = await request(app)
        .post('/incidents')
        .set("Authorization", ongResponse.body.id)
        .send({
          title: "Cuidados com cão14",
          description: "Gastos com banho nos animais, transporte e funcionários",
          value: 100
        })
  
      expect(response.header).toHaveProperty('content-type', expect.stringMatching(/json/))
      expect(response.statusCode).toBe(200)
      expect(response.body).toHaveProperty('id')
      expect(response.body.id).toBe(1)
    })
  })
})