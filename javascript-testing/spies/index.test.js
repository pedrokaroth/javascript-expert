const Fibonacci = require('./src/Fibonacci')
const { createSandbox } = require('sinon')
const assert = require('node:assert')
const sinon = createSandbox()

; (async () => {
  {
    const fibonacci = new Fibonacci()
    const spy = sinon.spy(fibonacci, fibonacci.execute.name)

    for (const value of fibonacci.execute(5)) {}

    assert.deepEqual(spy.callCount, 6)
    assert.deepStrictEqual(spy.getCall(2).args, [3, 1, 2])
  }
  {
    const fibonacci = new Fibonacci()
    const spy = sinon.spy(fibonacci, fibonacci.execute.name)

    const results = [...fibonacci.execute(5)]
    const expected = [ 0, 1, 1, 2, 3 ]

    assert.deepStrictEqual(results, expected)
  }
})()