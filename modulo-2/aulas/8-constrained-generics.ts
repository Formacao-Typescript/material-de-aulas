{
  /**
   * Quando estamos criando um generic, podemos restringir o tipo que ele pode receber
   * por exemplo, se quisermos que o generic so aceite strings podemos fazer assim
   */
  function makeArray<T extends string>(x: T): T[] {
    return [x]
  }

  // Agora se tentarmos passar um number, o TS vai reclamar
  makeArray(1)

  /**
   * Isso é chamado de bounded generics ou constrained generics
   * e é uma forma de restringir o tipo que um generic pode receber
   * para um tipo específico ou um conjunto de tipos
   * pense que o extends é como se fosse um `=` para o generic
   *
   * É importante mencionar que o extends define o MINIMO que o generic pode receber
   * então se definirmos um generic como `T extends string` podemos passar um string
   * ou qualquer tipo que seja subtipo de string, como por exemplo um literal
   */
  makeArray('a') // "a"[]

  /**
   * Se voltarmos na nossa primeira aula de generics
   * podemos refazer nosso exemplo de Greet<T> para que ele aceite apenas strings
   * e apenas os valores 'morning', 'afternoon' e 'evening' para o segundo argumento
   */
  type Greet<
    Nome extends string,
    TimeOfDay extends 'morning' | 'afternoon' | 'evening'
  > = `Hello ${Nome}, good ${TimeOfDay}`
  const x: Greet<'Ana', 'morning'> = 'Hello Ana, good morning'
  const y: Greet<'Ana', 'night'> = 'Hello Ana, good night' // Erro

  /**
   * Ou na nossa função reverse que só pode aceitar arrays de qualquer tipo
   */
  function reverse<ArrayType extends any[]>(arr: ArrayType): ArrayType {
    return arr.toReversed() as ArrayType
  }

  reverse([1, 2, 3]) // number[]
  reverse(['a', 'b', 'c']) // string[]
  reverse([1, 'a']) // (string | number)[]
  reverse(1) // Erro
}
