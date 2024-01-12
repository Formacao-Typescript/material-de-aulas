{
  /**
   * Nem sempre a gente precisa definir o tipo de um generic
   * podemos deixar o TS inferir o tipo para a gente quando ele é obvio
   * por exemplo
   */
  function makeArray<T>(x: T): T[] {
    return [x]
  }

  // Se formos usar a função definindo o generic manualmente, faríamos assim
  const arr = makeArray<string>('a') // arr: string[]

  /**
   * Mas perceba que o tipo T é o mesmo tipo do argumento
   * Então se passarmos um string, o tipo T será string
   * e o retorno será um array de strings
   */
  const arr2 = makeArray('a') // arr: string[]

  /**
   * Isso fica mais evidente quando usamos funções nativas do JS
   * como Array.map
   *
   * Quando anotamos o tipo explicitamente, a função também vai funcionar
   */
  const m = [1, 2, 3].map<string>((item) => String(item)) // string[]

  /**
   * Mas se não anotarmos o tipo, o TS vai inferir o tipo do generic
   * baseado no tipo do retorno da função de callback
   */
  const m2 = [1, 2, 3].map((item) => String(item)) // string[]

  /**
   * Podemos usar essa inferência para tipar a nossa função de currying da aula passada
   */
  function sum(...args: number[]) {
    return args.reduce((a, b) => a + b, 0)
  }
  sum(1, 2, 3, 4, 5) // 15

  function curry<T>(func: (...args: T[]) => any) {
    return function curried(...args: T[]) {
      return function partial(...args2: T[]) {
        if (args2.length === 0) {
          return func(...args, ...args2)
        }
        return curried(...args, ...args2)
      }
    }
  }

  const curriedSum = curry(sum) // curriedSum agora tem argumentos do tipo number[]
  curriedSum(1)(2)(3)(4)(5)()
}
