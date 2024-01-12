{
  /**
   * Existe um padrão de projeto chamado convenience generics
   * que é usado para facilitar a vida do usuário da interface
   *
   * A ideia é ter um generic que é obrigatório em uma função
   * que define o retorno dessa função, mas ele não é usado
   * na implementação da função em si e são mais usados para
   * evitar um `as tipo` na hora de usar a função
   *
   * Por exemplo, JSON.parse
   */

  // JSON.parse recebe um string e retorna um tipo any
  const parsed = JSON.parse('{"a": 1}') as { a: 1 } // que temos que fazer um `as` para definir o tipo

  // Mas podemos usar convenience generics para facilitar a vida do usuário
  // e definir o tipo de retorno da função
  function parse<T>(json: string): T {
    return JSON.parse(json)
  }
  const parsed2 = parse<{ a: 1 }>('{ "a": 1 }') // não precisamos mais do `as` para definir o tipo
}
