{
  /**
   * Um generic pode aparecer em qualquer lugar de uma função
   * 1 - No início da função (antes dos parâmetros)
   * 2 - No retorno da função
   * 3 - Nos parâmetros da função
   * O único local obrigatório é no início da função
   *
   * Imagine que você está criando uma função normal: function nome (parametro) {}
   * Da mesma forma, podemos adicionar um generic, que é um parametro de um tipo
   * genérico: function nome<T> (parametro: T) {} <- Agora T está disponível como uma variável
   */
  function reverse<ArrayType>(arr: ArrayType[]): ArrayType[] {
    return arr.toReversed()
  }

  /**
   * Podemos criar tipos com generics também (mais na aula 3)
   */
  type Predicate<T> = (item: T) => boolean

  /**
   * Shorthands como arrow functions também funcionam
   */
  const filter = <ArrayType>(arr: ArrayType[], fn: Predicate<ArrayType>): ArrayType[] => {
    return arr.filter(fn)
  }

  filter<number>([1, 2, 3], (i) => i > 0)
}
