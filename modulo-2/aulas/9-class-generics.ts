{
  // Generics podem ser usados em classes, e é uma combinação de tudo que a gente aprendeu até agora.

  // Definindo uma classe com generics que recebe um tipo T
  class MinhaClasse<T> {}

  // A classe pode ter generics tanto na criação quando em qualquer método ou propriedade
  class Queue<T> {
    private data: T[] = []

    push(item: T) {
      this.data.push(item)
    }

    pop(): T | undefined {
      return this.data.shift()
    }

    peek(): T | undefined {
      return this.data[0]
    }
  }

  // Agora podemos criar uma instância da classe Queue e passar um tipo para o generic
  const queue = new Queue<string>()

  /**
   * Veja que os métodos da classe agora retornam
   * o tipo que passamos para o generic
   */
  // O tipo do item é string
  queue.push('a')

  // Qualquer outro tipo daria erro
  queue.push(1) // Erro

  // Retornamos o tipo string
  queue.pop() // string

  // Retornamos o tipo string
  queue.peek() // string

  /**
   * Classes podem implementar interfaces e outras classes também com generics
   */
  interface IQueue<T> {
    push(item: T): void
    pop(): T | undefined
    peek(): T | undefined
  }

  // Podemos usar o generic da interface na classe
  class Queue2<T> implements IQueue<T> {
    private data: T[] = []

    push(item: T) {
      this.data.push(item)
    }

    pop(): T | undefined {
      return this.data.shift()
    }

    peek(): T | undefined {
      return this.data[0]
    }
  }

  // Ela pode ter multiplos generics
  class Pair<T, U> {
    constructor(public a: T, public b: U) {}
  }

  // E também valores padrões e constrains
  class Pair2<T extends string, U = number> {
    constructor(public a: T, public b: U) {}
  }

  // As funções e métodos se comportam da mesma forma que vimos na aula anterior
  // Então um método de uma classe pode ter seus próprios generics e também usar os generics da classe
  class Queue3<TipoFila> {
    private data: TipoFila[] = []

    push(item: TipoFila) {
      this.data.push(item)
    }

    pop(): TipoFila | undefined {
      return this.data.shift()
    }

    peek(): TipoFila | undefined {
      return this.data[0]
    }

    map<Retorno>(fn: (item: TipoFila) => Retorno): Retorno[] {
      return this.data.map(fn)
    }
  }
}
