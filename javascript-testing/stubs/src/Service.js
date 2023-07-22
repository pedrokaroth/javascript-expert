class Service {
  constructor () {
    this.baseUrl = 'https://swapi.dev/api'
  }

  async request(endpoint) {
    return (await fetch(this.baseUrl + endpoint)).json()
  }

  async getPlanet(planetId) {
    const planet = await this.request('/planets/' + planetId)

    return {
      name: planet.name,
      surfaceWater: planet.surface_water,
      appeardIn: planet.films.length
    }
  }
}

module.exports = Service