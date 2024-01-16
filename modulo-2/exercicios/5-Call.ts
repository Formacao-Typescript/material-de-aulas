/**
 * Function.prototype.call<T>

A função `call` está presente em todas as funções do JavaScript, o que ela faz é levar uma lista de parâmetros variádicos e aplicar esses parâmetros na função que está sendo chamada sendo possível que ela troque o parâmetro `this`, por exemplo:

function sum (a:number, b: number) {
    return a+b
}
sum.call(null, 1, 2)

Vai chamar a função `sum` onde o `this` dessa função será `null` com os parâmetros 1 e 2.

Para esse desafio vamos ignorar o this, mas:

- Implemente uma função chamada `call` que leve como primeiro parâmetro a função que vai ser aplicada (ex: `sum`) e o segundo parâmetro será `...args`,
- Identifique os tipos que você não conhece e aplique generics para que você saiba:
    - O tipo dos parâmetros
    - O tipo da função
    - O tipo de retorno
- Dica: Lembre de como você cria funções variádicas!
 */

// Simples
export function call<T extends any[], U = unknown>(fn: (...args: T) => U, ...args: T): U {
  return fn(...args)
}
