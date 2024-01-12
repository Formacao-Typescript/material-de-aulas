{
  /**
   * Generics podem ser usados como uma forma de retornar um objeto parcial
   *
   * Quando usamos um generic em um objeto no topo e retornamos outros objetos com outros generics
   * podemos ter um objeto parcial com o que é chamado de currying
   *
   * Currying é um conceito funcional que representa uma forma de retornar um objeto parcial,
   * ou seja, um objeto que não está completo
   * de forma que você pode aplicar uma parte da função e retornar uma função que espera o resto
   *
   * Vamos ver um exemplo com uma soma simples
   */
  function simpleSum(a: number, b: number) {
    return a + b
  }

  // Chamamos como esperado
  simpleSum(1, 2) // 3

  /**
   * Vamos criar uma função que faz o currying de qualuqer função com um número fixo de argumentos
   *
   * Ela recebe a função que vamos particionar e retorna uma função que recebe 1 ou mais argumentos
   */
  function currySimple(func: (...args: any) => any) {
    // Não se preocupe com o any por enquanto
    // Retornamos a função que recebe um número arbitrário de argumentos (variádico)
    return function curried(...args: unknown[]) {
      // Se o número de argumentos for maior ou igual ao número de argumentos da função original
      if (args.length >= func.length) {
        // Chamamos a função original com os argumentos que temos
        return func(...args)
      }
      // Se não, retornamos uma função que recebe o resto dos argumentos
      return function partial(...args2: unknown[]) {
        // E chamamos a função de currying novamente com os argumentos que temos
        return curried(...args, ...args2)
      }
    }
  }

  // Agora podemos criar a nossa função de soma parcial
  const partialSum = currySimple(simpleSum)

  // Agora a chamada muda um pouco
  // Chamamos a função com o primeiro argumento
  const partialSum1 = partialSum(1) // isso retorna uma função que espera o segundo argumento
  const partialSum2 = partialSum1(2) // isso retorna o resultado da soma que é 3

  // Podemos chamar a função de forma encadeada
  const partialSum3 = partialSum(1)(2) // 3

  /**
   * Também podemos deixar um pouco mais complexo e criar uma função que recebe um número arbitrário de argumentos
   *
   * Nesse caso uma soma de n números
   */
  function sum(...args: number[]) {
    return args.reduce((a, b) => a + b, 0)
  }
  sum(1, 2, 3, 4, 5) // 15

  /**
   * Vamos criar uma função que faz o currying de qualuqer função com um número arbitrário de argumentos
   *
   * Ela recebe a função que vamos particionar e retorna uma função que recebe 1 ou mais argumentos
   * mas perceba que a checagem final é um pouco diferente
   */
  function curry(func: (...args: any) => any) {
    // Retornamos uma função que recebe um número arbitrário de argumentos (variádico)
    // para podermos ter os argumentos de `func`
    return function curried(...args: unknown[]) {
      // Essa função sempre retorna um função que recebe um número arbitrário de argumentos
      return function partial(...args2: unknown[]) {
        // Para finalizarmos a chama da função, precisamos verificar se o número de argumentos é 0
        // ou seja, se temos () no final da chamada
        if (args2.length === 0) {
          // Se for, chamamos a função original com os argumentos que temos
          return func(...args, ...args2)
        }
        // Se não, chamamos a função de currying novamente com os argumentos que temos
        // isso vai concatenar os argumentos que temos com os argumentos que vamos receber
        return curried(...args, ...args2)
      }
    }
  }

  const curriedSum = curry(sum)
  curriedSum(1)(2)(3)(4)(5)() // 15

  /**
   * RUNTIME BOUNDING
   * Existe um conceito chamado de runtime bounding
   * que é o momento na execução que o generic recebe seu valor concreto
   *
   */

  // Imagine que temos uma interface que recebe um tipo inicial
  interface Ops<TipoInicial> {
    // Agora podemos usar o generic TipoInicial para definir o tipo do array
    array: TipoInicial[]
    // E podemos usar o TipoInicial como uma variável de tipo para a função map
    // em Convert recebemos um outro generic TipoFinal que é o tipo do array que vamos retornar
    prefix: <Prefixo>(item: TipoInicial, prefixo: Prefixo) => string
  }

  /**
   * A principal diferença é que, enquanto o TipoInicial é definido
   * no momento que a gente cria a interface, por exemplo:
   */
  // @ts-expect-error
  const ops: Ops<number> = {} // aqui o TipoInicial é number

  // O TipoFinal é definido no momento que chamamos a função prefix
  const ops2: Ops<number> = {
    array: [1, 2, 3],
    prefix: (item, prefixo) => `${prefixo}${item}` // Aqui ainda não sabemos o prefixo porque é a definição
  }

  ops2.prefix<'a'>(1, 'a') // podemos especificar o tipo do prefixo aqui

  /**
   * O tipo Map é um desses tipos
   */
  const x = [1, 2, 3].map((item) => item.toString()) // string[]

  /**
   * No caso acima, `map` tem esse tipo:
   * Array<number>.map<string>(callbackfn: (value: number, index: number, array: number[]) => string, thisArg?: any): string[]
   *
   * Veja que ele é um subtipo de Array<number> que é o tipo principal e o tipo de definimos no map é o tipo secundário
   * que é definido durante a execução
   */

  /**
   * Este é o equivalente mais próximo de um currying com generics
   * Que é o que chamamos de runtime bounding.
   * Runtime bounding diz quando um tipo é definido na execução do código.
   *
   * Na interface<T> o tipo é definido na criação da interface
   * então T obtem o valor que passarmos na instancia (ou implementação) da interface
   *
   * Já na função prefix<U> o tipo é definido na chamada da função
   * então U obtem o valor que passarmos na chamada da função e não no momento da criação da interface
   * independente do valor de T
   */
}
