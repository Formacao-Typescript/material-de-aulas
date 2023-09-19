// Sintaxe
{
    // Declarando objetos com type aliases
    type Pessoa = {
      nome: string // a gente não precisa de virgula aqui
      idade: number
      corFavorita: string
    }
  
    // usando objetos declarados normalmente
    // mostrar o intellisense
    const pessoa: Pessoa = {
      nome: 'João',
      idade: 30,
      corFavorita: 'azul'
    }
  
    // OBJECT LITERAL com objetos (lembre o nome)
    // aqui a gente já precisa de vírgula
    const Ana: { nome: string, idade: number, corFavorita: string } = {
      nome: 'Ana',
      idade: 30,
      corFavorita: 'azul'
    }
  
    // aliases podem aparecer em parâmetros de funções
    function foo (pessoa: Pessoa) {}
    // ou literalmente
    function bar (pessoa: { nome: string, idade: number, corFavorita: string }) {}
    // Mostrar que o intellisense funciona em ambos os casos
    // Mostrar que podemo usar o cmd+. para refatorar e criar um alias de um tipo 
  
    // objetos podem ter outros objetos
    type Carro = {
      marca: string
      ano: number
      dono: Pessoa
    }
  
    // literalmente seria
    type CarroLiteral = {
      marca: string
      ano: number
      dono: {
        nome: string
        idade: number
        corFavorita: string
      }
    }
  }
  
  // Erros com tipos a mais ou a menos
  // e propriedades opcionais
  {
    type obj = {
      a: string
      b: number
    }
  
    const foo: obj = {
      a: 'a',
      b: 1
    }
  
    // remover a propriedade obrigatória dá um erro
    const bar: obj = { // erro
      a: 'xpto'
    }
  
    // adicionar mais propriedades também dá erro
    // mas vamos ver como resolver isso depois
    // com index signatures
    const baz: obj = {
      a: 'xpto',
      b: 1,
      c: true // erro
    }
  
    // podemos dizer que uma propriedade é opcional
    type obj2 = {
      a: string
      b?: number // o ? diz que a propriedade é opcional
    }
  
    // Agora podemos omitir a propriedade b
    // mas não podemos adicionar nada novo
    const foo2: obj2 = {
      a: 'a', // não temos b
      c: 1 // erro
    }
  
    // Isso é válido para literals também
    const bar2: { a: string, b?: number } = {
      a: 'a',
    }
  }
  
  // Readonly
  {
    // podemos deixar qualquer propriedade de um objeto
    // como readonly
    type obj = {
      readonly a: string
      readonly b: number
    }
  
    // isso vai aplicar o padrão dos readonly arrays
    // onde não podemos alterar o valor da propriedade
    const foo: obj = {
      a: 'a',
      b: 1
    }
  
    foo.a = 'xpto' // erro
    foo.b = 2 // erro
  }
  
  // Structural typing
  {
    // Um tipo definido como pessoa
    type Pessoa = {
      nome: string
      idade: number
      corFavorita: string
    }
  
    // Um tipo definido como carro
    type Carro = {
      marca: string
      ano: number
      dono: Pessoa
    }
  
    // Uma pessoa usando o type alias
    const Joao: Pessoa = {
      nome: 'João',
      idade: 30,
      corFavorita: 'azul'
    }
  
    // Uma pessoa usando um object literal
    const Ana: { nome: string, idade: number, corFavorita: string } = {
      nome: 'Ana',
      idade: 30,
      corFavorita: 'azul'
    }
  
    // Joao é o dono do carro
    // todas as propriedades que ele tem batem com o que o carro precisa
    // Mas isso é esperado porque ele é do tipo Pessoa
    const carroAzul: Carro = {
      marca: 'Fiat',
      ano: 2020,
      dono: Joao
    }
  
    // Ana é o dono do carro
    // todas as propriedades que ela tem batem com o que o carro precisa
    // Mas ela não é do tipo pessoa, e sim um object literal
    const carroPreto: Carro = {
      marca: 'Fiat',
      ano: 2020,
      dono: Ana // As propriedades são as mesmas então é uma pessoa
    }
  }