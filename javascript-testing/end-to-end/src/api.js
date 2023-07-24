const { once } = require('events');
const http = require('http');

const DEFAULT_USER = {
  username: 'pedrokaroth',
  password: '1234'
}

const routes = {
  '/contact:get': (_, response) => {
    return response.writeHead(200).end('Contact us')
  },
  '/login:post': async (request, response) => {
    const data = await once(request, "data")

    const { username, password } = JSON.parse(data.toString())

    if (username !== DEFAULT_USER.username || password !== DEFAULT_USER.password) {
      return response.writeHead(401).end('User not found')
    }

    return response.writeHead(200).end('Login succeded')    
  },
  default: (_, response) => {
    return response.writeHead(404).end('Not Found')
  }
}

function handler (request, response) {
  const { method, url } = request

  const endpoint = routes[`${url.toLowerCase()}:${method.toLowerCase()}`] || routes.default

  return endpoint(request, response)
}

const app = http.createServer(handler)
  .listen(3000)

module.exports = app