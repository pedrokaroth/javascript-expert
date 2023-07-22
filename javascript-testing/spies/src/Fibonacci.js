class Fibonacci {
  * execute (input, current = 0, next = 1) {
    if (!input) {
      return
    }


    yield current

    // Delega a funcao mas nao retorna (yield *)
    yield * this.execute(input - 1, next, next + current)
  }
}

module.exports = Fibonacci