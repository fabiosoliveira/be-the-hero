const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback()
    await connection.migrate.latest()
  })

  afterAll(async () => {
    await connection.destroy()
  })

  describe('POST', () => {
    it('should be able to create a new ONG', async () => {
      const response = await request(app)
        .post('/ongs')
        .send({
          name:"APAD",
          email:"contato@teste.com",
          whatsapp:"4700000000",
          city:"Rio Sul",
          uf:"SC"
        })
  
      expect(response.header).toHaveProperty('content-type', expect.stringMatching(/json/))
      expect(response.statusCode).toBe(200)
      expect(response.body).toHaveProperty('id', expect.stringMatching(/^[A-Fa-f0-9]+$/))
      expect(response.body.id).toHaveLength(8)
    })

    describe('should be able to validate', () => {
      describe('email', () => {
        it('must be a valid email', () => {
          validateField({ 
            key: 'email', 
            value: 'contatoteste.com', 
            message: "\"email\" must be a valid email"
          })
        })
    
        it('is not allowed to be empty', () => {
          validateField({ 
            key: 'email', 
            value: "", 
            message: "\"email\" is not allowed to be empty"
          })
        })
    
        it('must be a string', () => {
          validateField({ 
            key: 'email', 
            value: 0, 
            message: "\"email\" must be a string"
          })
        })
      })

      describe('name', () => {
        it('is not allowed to be empty', () => {
          validateField({ 
            key: 'name', 
            value: "", 
            message: "\"name\" is not allowed to be empty"
          })
        })
    
        it('must be a string', () => {
          validateField({ 
            key: 'name', 
            value: 55, 
            message: "\"name\" must be a string"
          })
        })
      })

      describe('whatsapp', () => {
        it('is not allowed to be empty', () => {
          validateField({ 
            key: 'whatsapp', 
            value: "", 
            message: "\"whatsapp\" is not allowed to be empty"
          })
        })
    
        it('must be a string', () => {
          validateField({ 
            key: 'whatsapp', 
            value: 55, 
            message: "\"whatsapp\" must be a string"
          })
        })

        it('length must be at least 10 characters long', () => {
          validateField({ 
            key: 'whatsapp', 
            value: "555", 
            message: "\"whatsapp\" length must be at least 10 characters long"
          })
        })

        it('length must be less than or equal to 11 characters long', () => {
          validateField({ 
            key: 'whatsapp', 
            value: "54646464646466464655", 
            message: "\"whatsapp\" length must be less than or equal to 11 characters long"
          })
        })
      })

      describe('city', () => {
        it('is not allowed to be empty', () => {
          validateField({ 
            key: 'city', 
            value: "", 
            message: "\"city\" is not allowed to be empty"
          })
        })
    
        it('must be a string', () => {
          validateField({ 
            key: 'city', 
            value: 55, 
            message: "\"city\" must be a string"
          })
        })
      })

      describe('uf', () => {
        it('is not allowed to be empty', () => {
          validateField({ 
            key: 'uf', 
            value: "", 
            message: "\"uf\" is not allowed to be empty"
          })
        })
    
        it('must be a string', () => {
          validateField({ 
            key: 'uf', 
            value: 55, 
            message: "\"uf\" must be a string"
          })
        })

        it('length must be 2 characters long', () => {
          validateField({ 
            key: 'uf', 
            value: "SPD", 
            message: "\"uf\" length must be 2 characters long"
          })
        })
      })
    })
  })

  describe('GET', () => {
    it('should be able to list ONG empty', async () => {
      const response = await request(app).get('/ongs')
  
      expect(response.header).toHaveProperty('content-type', expect.stringMatching(/json/))
      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual([])
    })

    describe('', () => {
      beforeEach(async () => {
        await request(app)
          .post('/ongs')
          .send({
            name:"APADa",
            email:"contato@teste.com",
            whatsapp:"4700000000",
            city:"Rio Sul",
            uf:"SC"
          })
  
        await request(app)
          .post('/ongs')
          .send({
            name:"APADb",
            email:"contato@teste3.com",
            whatsapp:"4700000000",
            city:"Rio Sul",
            uf:"SC"
          })
      })

      it('should be able to list ONG filled', async () => {
  
        const response = await request(app).get('/ongs')
    
        expect(response.header).toHaveProperty('content-type', expect.stringMatching(/json/))
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveLength(2)
        expect(response.body).toEqual(expect.arrayContaining([
          {
            id: expect.stringMatching(/^[A-Fa-f0-9]+$/),
            name:"APADa",
            email:"contato@teste.com",
            whatsapp:"4700000000",
            city:"Rio Sul",
            uf:"SC"
          }
        ]))
      })
  
      it('should be able to have all properties of this fields', async () => {
        const response = await request(app).get('/ongs')
  
        response.body.map(item => {
          expect(item).toHaveProperty('id')
          expect(item).toHaveProperty('name')
          expect(item).toHaveProperty('email')
          expect(item).toHaveProperty('whatsapp')
          expect(item).toHaveProperty('city')
          expect(item).toHaveProperty('uf')
        })
      })
    })
  })
})

async function validateField({ key, value, message }) {
  const objectSend = {
    name:"APAD",
    email:"contato@teste.com",
    whatsapp:"4700000000",
    city:"Rio Sul",
    uf:"SC"
  }

  const errorRespose = {
    statusCode: 400,
    error: "Bad Request",
    message: "",
    validation: {
      source: "body",
      keys: [
        "email"
      ]
    }
  }

  objectSend[key]=value

  errorRespose.validation.keys = [key]
  errorRespose.message=message

  const response = await request(app)
    .post('/ongs')
    .send(objectSend)

  expect(response.header).toHaveProperty('content-type', expect.stringMatching(/json/))
  expect(response.statusCode).toBe(400)
  expect(response.body).toMatchObject(errorRespose)
}