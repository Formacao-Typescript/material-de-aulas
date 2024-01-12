/**
 * Generics podem ser usados em tipos e interfaces
 */

// Um generic em tipo é simples, como vimos antes
{
  type Nullable<T> = T | null

  // Podemos usar o generic em qualquer lugar que usamos um tipo
  const a: Nullable<number> = 1
  const b: Nullable<string> = 'a'

  // Um tipo pode ter mais de um generic
  type Pair<T, U> = [T, U]
  const pair: Pair<number, string> = [1, 'a']

  // Um exemplo é o tipo Record
  // Ele recebe dois generics, o primeiro é o tipo da chave e o segundo o tipo do valor
  const record: Record<string, number> = {
    a: 1,
    b: 2
  }

  // Também podemos usar generics em interfaces
  interface IGeneric<T> {
    value: T
  }

  // O generic em uma interface pode ser usado em qualquer lugar que um generic em um tipo pode ser usado
  const generic: IGeneric<number> = {
    value: 1
  }

  // Mas também nos membros da interface
  interface IGeneric2<T> {
    value: T
    getValue(): T
  }

  // E também podemos ter mais de um generic
  interface IGeneric3<T, U> {
    value: T
    getValue(): U
  }

  // Podemos ter generics obrigatórios dentro de uma interface
  // que força o usuário a implementar o generic em uma função, por exemplo
  interface IGeneric4<T> {
    value: T
    getValue<U>(item: U): U // o generic U é obrigatório na hora de implementar a função
  }

  const generic4: IGeneric4<number> = {
    value: 1,
    getValue<U>(item: U) {
      // o generic U é obrigatório na hora de implementar a função
      return item
    }
  }
}
