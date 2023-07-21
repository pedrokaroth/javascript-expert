const File = require("./src/File")
const assert = require('node:assert')

;(async () => {
  {
    const response = File.csvToJSON('mocks/invalid-header.csv')
    const expected = new Error('Cabecalho do arquivo esta invalido.')

    await assert.rejects(response, expected)
  }

  {
    const response = File.csvToJSON('mocks/empty-file.csv')
    const expected = new Error('O arquivo nao pode estar vazio.')

    await assert.rejects(response, expected)
  }

  {
    const response = File.csvToJSON('mocks/invalid-lines.csv')
    const expected = new Error('O arquivo nao pode conter mais de 4 registros')

    await assert.rejects(response, expected)
  }

  {
    const response = await File.csvToJSON('mocks/sucess-file.csv')
    const expected = [
      { id: '1', nome: 'pedro', profissao: 'dev', idade: '24' },
      { id: '2', nome: 'bruna', profissao: 'biologa', idade: '22' },
      { id: '3', nome: 'nhebinha', profissao: 'trabalhador', idade: '23' }
    ]

    assert.deepStrictEqual(response, expected)
  }
})()