/**
 * Reduce<T>

Implementamos o map em aula e o filter, agora só precisamos implementar o medonho reduce!

- Crie uma função que replique o comportamento da função reduce do array!
- Siga as mesmas instruções da função filter anterior
*/

// Simples
function BetterReduce<T, U = never>(
  arr: T[],
  fn: (acc: U, current: T, index: number, arr: T[]) => U,
  initialValue: U
): U {
  return arr.reduce(fn, initialValue)
}

// Reimplementando a função
function BetterReduce2<T, U = never>(
  arr: T[],
  fn: (acc: U, current: T, index: number, arr: T[]) => U,
  initialValue: U
): U {
  let acc = initialValue
  for (let i = 0; i < arr.length; i++) {
    acc = fn(acc, arr[i], i, arr)
  }
  return acc
}
