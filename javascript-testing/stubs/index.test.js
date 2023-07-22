const Service = require("./src/Service");
const assert = require('node:assert')
const { createSandbox } = require('sinon')
const sinon = createSandbox()

const service = new Service()

const stub = sinon.stub(
  service,
  'request',
)

const mocks = {
  aderaan: require('./mocks/alderaan.json'),
  tatooine: require('./mocks/tatooine.json'),
  yaviniv: require('./mocks/yaviniv.json')
}

;
(async () => {
  {
    stub.withArgs('/planets/3').resolves(mocks.yaviniv)
    const response = await service.request('/planets/3')
    const expected = 14

    assert.equal(Object.keys(response).length, expected)
  }
  {
    stub.withArgs('/planets/1').resolves(mocks.tatooine)
    const response = await service.getPlanet(1)
    const expected = { name: 'Tatooine', surfaceWater: '1', appeardIn: 5 }
    assert.deepStrictEqual(response, expected)
  }
  {
    stub.withArgs('/planets/2').resolves(mocks.aderaan)
    const response = await service.getPlanet(2)
    const expect = { name: 'Alderaan', surfaceWater: '40', appeardIn: 2 }
    assert.deepStrictEqual(response, expect)
  }
})()