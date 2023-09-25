{
  // classes abstratas são definidas colocando
  // a palavra abstract na frente da classe
  abstract class Veiculo {}

  // não é possível instanciar uma classe abstrata
  const veiculo = new Veiculo() // erro

  // classes abstratas podem ter métodos abstratos
  abstract class Animal {
    abstract fazerBarulho(): void // os métodos abstratos não tem implementação, só a assinatura
  }

  // classes que herdam de classes abstratas devem implementar os métodos abstratos
  class Pato extends Animal {
    fazerBarulho(): void {
      console.log('Quack!')
    }
  }

  // Se uma classe não implementar todos os métodos
  // da classe abstrata, teremos um erro
  class Cachorro extends Animal {} // erro

  // podemos usar o editor para poder implementar rapidamente o método
  // remova todo o corpo da classe abaixo e
  // pressione ctrl + . e escolha a opção implementar classe abstrata
  class Gato extends Animal {
    fazerBarulho(): void {
      // esse método precisa ser trocado e implementado propriamente
      throw new Error('Method not implemented.') // usar o editor vai te dar essa assinatura
    }
  }
}

{
  // classes abstratas podem ter métodos não abstratos
  // é o que a gente chama de molde
  abstract class Pessoa {
    // o construtor pode definir os atributos da classe
    // que todas as classes filhas vão ter
    constructor(
      public nome: string,
      public idade: number,
      protected cpf: string // somente acessível nas classes filhas
    ) {}

    // métodos não abstratos podem ser usados normalmente
    // e podem ser sobrescritos nas classes filhas
    public apresentar(): void {
      console.log(`Olá, meu nome é ${this.nome}`)
    }

    // métodos abstratos não tem implementação
    abstract dizerProfissao(): void
  }

  class Aluno extends Pessoa {
    constructor(nome: string, idade: number, cpf: string, private _matricula: string) {
      super(nome, idade, cpf)
      this._matricula = this.cpf + this.idade
    }

    // métodos abstratos precisam ser implementados
    dizerProfissao(): void {
      console.log('Sou aluno')
    }

    // podemos ter mais coisas do que a classe abstrata
    get matricula() {
      return this._matricula
    }
  }

  const aluno = new Aluno('João', 20, '000.000.000-00', '123456')
  aluno.apresentar() // Olá, meu nome é João
  aluno.dizerProfissao() // Sou aluno
  aluno.matricula // 000.000.000-0020

  const pessoa: Pessoa = new Aluno('Maria', 30, '111.111.111-11', '654321') // ok
  pessoa.apresentar() // Olá, meu nome é Maria
  pessoa.dizerProfissao() // Existe mas não sabemos o que faz
  pessoa.matricula // erro
}

// implementação por interface
{
  // uma classe pode implementar uma interface
  interface Animal {
    nome: string
    idade: number
    fazerBarulho(): void
  }

  class Cachorro implements Animal {
    constructor(public nome: string, public idade: number) {}

    fazerBarulho(): void {
      console.log('Au au!')
    }
  }

  // ou múltiplas interfaces
  interface Terreste {
    andar(): void
  }

  interface Aquatico {
    nadar(): void
  }

  class Pato implements Animal, Terreste, Aquatico {
    constructor(public nome: string, public idade: number) {}

    fazerBarulho(): void {
      console.log('Quack')
    }

    andar(): void {
      console.log('Andando...')
    }

    nadar(): void {
      console.log('Nadando...')
    }
  }

  const pato: Animal = new Pato('Pato', 2)
  pato.fazerBarulho() // Quack
  pato.nadar() // erro
}
