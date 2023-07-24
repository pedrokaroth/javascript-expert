const { describe, test, before, after } = require('mocha')
const request = require('supertest')
const assert = require('node:assert')

describe('API suite tests', function () {
  let app
  before((done) => {
    app = require('../src/api')
    app.once('listening', done)
  })

  after((done) => app.close(done))

  describe('/contact', () => {
    test('Should return contact us', async () => {
      const response = await request(app).get('/contact').expect(200)
      const expected = 'Contact us'

      assert.equal(response.text, expected)
    })
  })
  describe('/login', function () {
    test('Should login with success', async () => {
      const response = await request(app)
        .post('/login')
        .send({ username: 'pedrokaroth', password: '1234'})
        .expect(200)

      const expected = 'Login succeded'

      assert.equal(response.text, expected)
    })
    test('Should return User not Found with status code 401', async () => {
      const response = await request(app)
        .post('/login')
        .send({ username: 'pedrokaroth', password: '123'})
        .expect(401)

      const expected = 'User not found'

      assert.equal(response.text, expected)
    })
  })

  describe('/* ', function () {
    test('Should return 404 not found', async () => {
      const response = await request(app).get('/idaisd').expect(404)
      const expect = 'Not Found'

      assert.equal(response.text, expect)
    })
  })
})