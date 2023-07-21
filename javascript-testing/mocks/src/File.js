const { readFile } = require('fs/promises')

const options = {
  fields: ['id', 'nome', 'profissao', 'idade']
}

class File {
  static async csvToJSON(path) {
    const file = await readFile(path, 'utf-8')

    const [header, ...content] = file.split('\n')

    if (header !== options.fields.join(',')) {
      throw new Error('Cabecalho do arquivo esta invalido.')
    }

    if (!content.length) {
      throw new Error('O arquivo nao pode estar vazio.')
    }

    if (content.length > 4) {
      throw new Error('O arquivo nao pode conter mais de 4 registros')
    }

    const headers = header.split(',')
    
    const response = []
    for (const line in content) {
      const object = {}
      const data = content[line].split(',')

      if (!data) {
        continue
      }

      for (const index in data) {
        object[headers[index]] = data[index]
      }

      response.push(object)
    }

    return response
  }
}

module.exports = File