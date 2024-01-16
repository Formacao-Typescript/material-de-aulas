/**
 * Object.keys<T>

Um dos grandes problemas que o TypeScript tem é que, quando usamos `Object.keys` de forma dinâmica, como neste exemplo:

Object.keys(obj).forEach(key => obj[key])

Vamos ter um erro porque `obj[key]` não é do tipo `keyof obj`, então precisamos implementar uma melhor forma de tipar as nossas chaves de forma que o Object.keys saiba que essa função sempre vai retornar `keyof obj`

- Crie uma função chamada `betterKeys` que leve o objeto que você vai decompor
- Essa função deve inferir através do generic, quais são as chaves que vão ser retornadas no array de chaves
- O generic só pode aceitar objetos, então você precisa usar `extends` para garantir que o tipo passado é um objeto
 */

// Simples
export function BetterKeys<T extends Record<string, unknown>>(obj: T): (keyof T)[] {
  return Object.keys(obj)
}

const obj = { a: 1, b: 2 }
BetterKeys(obj).forEach((i) => obj[i]) // sem erro
Object.keys(obj).forEach((i) => obj[i]) // com erro
