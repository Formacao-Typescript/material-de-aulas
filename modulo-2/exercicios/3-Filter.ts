/**
 * Filter<T>

Você já conhece a função filter do array, já implementamos ela antes, agora quero ver se você entendeu!

Desafio:

- Implemente uma função `BetterFilter` que vai agir exatamente igual à função `Array.prototype.filter` do JavaScript
- Essa função precisa levar o array como parametro de entrada
- A implementação pode ser apenas um `return arr.filter(fn)` usando o filter original (mas não vale usar os mesmos generics!)
    - Você pode reimplementar toda a função também, acha que está apto(a) para a tarefa!?
*/

// Simples
export function BetterFilter<T>(arr: T[], fn: (item: T) => boolean): T[] {
  return arr.filter(fn)
}

// Avançado apenas aceitando arrays de retorno
export function BetterFilter2<T extends any[]>(arr: T, fn: (item: T extends (infer U)[] ? U : never) => boolean): T {
  return arr.filter(fn) as T
}

// Reimplementando a função
export function BetterFilter3<T>(arr: T[], fn: (item: T) => boolean): T[] {
  const result: T[] = []
  for (const item of arr) {
    if (fn(item)) result.push(item)
  }
  return result
}
