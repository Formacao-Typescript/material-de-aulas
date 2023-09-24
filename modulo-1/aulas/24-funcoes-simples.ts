// Sintaxe de uma função simples
{
  // function nomeDaFuncao(parametro1: tipo, parametro2: tipo): tipoDeRetorno {}
  function somar(a: number, b: number): number {}

  // Existe um parâmetro escondido chamado de Type Parameter
  // que vamos ver mais no capítulo de generics
  function foo<T>(a: T, b: T): T {}

  // Exemplo de função que não retorna nada
  function log(message: string): void {}

  // No geral, vamos apenas tipar os parâmetros
  // o tipo de retorno é inferido pelo TypeScript
  // exceto em casos muito específicos
  function bar(message: string) {
    // o retorno é string
    return message
  }

  // chamar uma função com um tipo diferente de parâmetro vai dar um erro
  bar(1) // erro

  // Assim como retornar um tipo que não for especificado no retorno
  // vai dar um erro
  function returnError(a: string): number {
    return a // erro
  }
}

// formas de declarar uma função
{
  // Funções nomeadas

  // Function Declaration
  function foo(a: number, b: number) {}

  // Named Function Expression
  // É uma Function Expression com nome
  // É útil para debugar porque se tivermos erros
  // o nome da função aparece no stack trace
  const somar = function sum(a: number, b: number) {}

  // Funções anônimas

  // Function Expression
  const bar = function (a: number, b: number) {}

  // Arrow Function
  const sum = (a: number, b: number) => {}

  // Short Arrow Function
  const shortsum = (a: number, b: number) => a + b

  // IIFE - Immediately Invoked Function Expression
  // Função que é executada imediatamente
  // Já falamos dela antes bem rápido
  ;(function () {
    console.log('Executou!')
  })()

  // IIFEs podem ter arrow functions
  ;(() => {
    console.log('Executou!')
  })()

  // Construtores de função
  // Não é muito usado, mas é uma forma de declarar funções
  // O uso principal é quando você tem algum tipo de código externo
  // que precisa de uma função
  // dessa forma você consegue criar tanto a função quando o corpo dela
  // usando variáveis
  const dynamicSum = new Function('a', 'b', 'return a + b')

  // construtores não são uma boa forma de declarar funções
  // porque elas não são tipadas
  // o dynamicSum é do tipo Function
  // o tipo Function aceita qualquer função
  // e a única coisa que o TS sabe sobre ele é que ele é executável
  dynamicSum(1, 2) // funciona, mas não temos nenhuma inferencia de tipos
}

// Funções com parâmetros opcionais
{
  // Funcionam igual à objetos com propriedades opcionais
  // o parâmetro opcional deve ser o último
  function foo(a: number, b?: number) {}

  // Se o parâmetro opcional for primeiro, ele não funciona
  // porque o JS tem parâmetros posicionais
  function bar(a?: number, b: number) {} // TS não tem como saber qual é o parâmetro opcional

  // Se o parâmetro opcional for o único, ele funciona
  function baz(a?: number) {} // ok

  // Parâmetros podem ter valores padrão
  // Da mesma forma ele precisa ser o último
  function fooDefault(a: number, b: number = 10) {}

  // Eles não podem ser opcionais e não precisam ter anotação de tipo
  function barDefault(a: number, b = 10) {} // TS identifica que b é number
  function barErro(a: number, b?: number = 10) {} // erro, não pode ser opcional e ter valor padrão
}

// Parâmetros variádicos
{
  // Parâmetros variádicos são parâmetros que podem receber
  // um número variável de argumentos
  // Eles são representados por três pontos antes do nome do parâmetro
  // e são chamados de rest parameters
  function fooVariadic(...args: number[]) {}

  // Qualquer parâmetro variável é um array do tipo do parâmetro
  // Mas não podemos declarar o tipo como um array e esperar que seja variádico
  function barVariadic(args: number[]) {} // não funciona

  fooVariadic(1, 2, 3, 4) // funciona
  barVariadic(1, 2, 3, 4) // não funciona porque a função espera um array único

  // Variádicos precisam ser os últimos parâmetros da função
  // e só pode haver um por função
  function bazVariadic(a: number, ...args: number[]) {} // ok
  function first(...args: number[], a: number) {} // erro, não pode ser o primeiro
  function multiple(...args: number[], ...args2: number[]) {} // erro, só pode ter um
}

// Call signatures ou type signatures
{
  // Call signatures são a forma de declarar uma função
  // em uma interface ou type usando tipos puramente
  // é assim que o TypeScript entende funções como tipos
  interface Foo {
    // call signatures são bem parecidas com arrow functions
		// aqui precisamos obrigatoriamente ter a tipagem do retorno
    fn: (a: number, b: number) => number
  }

  type MinhaFn = (a: number, b?: number) => number
  type Variadic = (...args: number[]) => number[]

  // Assim podemos forçar a tipagem de uma função para que seja o que a gente quer
  let variadic: Variadic = (...args) => args
}
