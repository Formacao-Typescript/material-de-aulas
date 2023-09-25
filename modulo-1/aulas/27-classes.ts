{
  // Uma classe vazia simples
  class Foo {}

  // Classes são tipos FECHADOS
  // Não possuem declaration merging
  class Foo {}

  // Vamos adicionar alguns membros a classe
  class Animal {
    // propriedade pública explícita
    // o public não é necessário
    public idade: number // erro porque não foi inicializada

    // propriedade pública implícita (mais comum)
    // todo membro público precisa ser inicializado
    // se a propriedade strictPropertyInitialization for true no tsconfig
    nome: string = '' // inicializada equivalente a public nome: string = ''

    // propriedade privada
    // não pode ser acessada fora da classe
    // porém é o que chamamos de soft private
    // porque só está valendo em tempo de compilação
    // então em tempo de execução é possível acessar a propriedade
    // através do operador `in` ou Animal['id']
    private id: string = '' // soft private

    // Hard private
    // essa é uma notação do JavaScript
    // diferentemente do private, essa propriedade não pode ser acessada
    // nem mesmo em tempo de execução
    // por ninguém fora da classe
    #idPrivado: number = 0 // hard private

    // propriedade protegida
    // não pode ser acessada fora da classe
    // a não ser que a classe seja uma subclasse de Animal
    // ou seja, se uma classe estender animal
    protected peso: number = 0

    // propriedades readonly
    // não podem ser alteradas depois de inicializadas
    // podem ser inicializadas no construtor
    // ou no momento da declaração
    readonly dataCriacao: Date = new Date() // equivalente a public readonly dataCriacao: Date = new Date()
    private readonly hash: string = ''
    protected readonly original: boolean = true

    // construtor
    constructor(nome: string, idade: number) {
      this.nome = nome // o erro some porque a propriedade foi inicializada
      this.idade = idade
      this.id = '123'
      this.#idPrivado = 123 // temos que usar o # para acessar a propriedade
      this.hash = btoa(this.nome + this.idade) // btoa é uma função do JavaScript
      this.peso = 10 // podemos acessar a propriedade protegida
    }
  }

  // Vamos criar uma instância de Animal
  const animal = new Animal('Rex', 10) // o construtor é chamado automaticamente
  // podemos acessar as propriedades públicas
  animal.nome
  animal.idade
  // não podemos acessar as propriedades privadas
  animal.id // erro
  animal.#idPrivado // erro
  // não podemos alterar as propriedades readonly
  animal.dataCriacao = new Date() // erro
}

// Associação no construtor
{
  // Vamos criar uma classe para representar um carro
  class Carro {
    // podemos associar propriedades no construtor
    // isso é uma forma de inicializar as propriedades
    // e associar os parâmetros ao mesmo tempo
    constructor(
      public readonly marca: string, // aqui o public é necessário se não tiver o readonly
      modelo: string, // essa se tornou um parâmetro normal, não uma propriedade
      private cor: string, // aqui o private é necessário uma vez associada não pode ser lida
      readonly ano: number, // aqui o public não é necessário
      protected readonly motor: string
    ) {} // nesses casos o construtor fica vazio quase sempre
  }

  // o construtor é uma função como qualquer outra
  class Moto {
    constructor(
      public marca: string, // a propriedade pode ser normal
      public chassi?: string, // pode ser opcional
      ...propriedades: string[] // mas uma propriedade não pode ser um spread no construtor
    ) {}
  }

  // Vamos criar uma instância de Carro
  const carro = new Carro('Ford', 'Ka', 'azul', 2020, '1.0')

  // agora da moto
  const moto = new Moto('Honda', '123')
  // ou sem o chassi
  const moto2 = new Moto('Honda')
  // ou com mais propriedades
  const moto3 = new Moto('Honda', '123', '1.0', 'azul')
}

// index signature
{
  // uma classe também pode ter uma index signature
  class Carro {
    [prop: string]: string | number | boolean

    constructor(
      public readonly marca: string, // quando fazemos isso, o TS entende que vamos ter essa propriedade sendo válida
      readonly ano: number,
      ...outras: { nome: string; valor: string | number | boolean }[]
    ) {
      // iteramos por todas as propriedades
      for (const { nome, valor } of outras) {
        // e adicionamos ao objeto
        this[nome] = valor
      }
    }
  }

  const carro = new Carro(
    'Ford',
    2020,
    { nome: 'motor', valor: '1.0' },
    { nome: 'cor', valor: 'azul' },
    { nome: 'portas', valor: 4 },
    { nome: 'automatico', valor: true }
  )
  carro.ano
  carro.marca // vamos ver tudo isso no nosso intellisense, mas não as propriedades extras
  carro['portas'] // mas podemos acessar porque temos uma index signature
  // Se comentarmos todas as linhas antes da linha 109
  // e rodarmos esse código com o ts-node
  // vamos ter o objeto completo no console
  console.log(carro)
}

// métodos e acessores
{
  // O TS não muda nada em relação ao JS
  // podemos ter métodos públicos, privados e protegidos
  // E podemos ter acessores
  class Carro {
    #ligado: boolean = false
    #velocidade: number = 0

    constructor(public readonly marca: string, readonly ano: number, public readonly nome: string) {}

    // método público
    public acelerar() {
      console.log(`acelerando para ${this.#velocidade}`)
    }

    // método privado
    // soft private
    private frear() {
      console.log('freando')
    }

    // hard private
    #ligar() {
      console.log('ligando')
      this.#ligado = true
    }

    // método protegido
    protected buzinar() {
      console.log('buzinando')
    }

    // acessor
    // getter
    get ligado() {
      return this.#ligado
    }

    // setter
    set velocidade(valor: number) {
      this.#velocidade = valor
    }

    get velocidade() {
      return this.#velocidade
    }
  }

  const carro = new Carro('Ford', 2020, 'Ka')
  carro.acelerar()
  carro.frear() // erro, privado
  carro.buzinar() // erro, protegido
  carro.ligar() // erro, privado
  carro.ligado // ok
  carro.velocidade // ok
  carro.velocidade = 10 // ok
}

// herança
{
  // Uma classe pode estender outra classe
  // e herdar suas propriedades e métodos
  class Animal {
    constructor(public readonly nome: string, public readonly idade: number) {}

    public comer() {
      console.log('comendo')
    }
  }

  // Vamos criar uma classe que estende Animal
  class Cachorro extends Animal {
    constructor(nome: string, idade: number, public readonly raca: string) {
      super(nome, idade) // precisamos chamar o construtor da classe pai
    }

    public latir() {
      console.log('au au')
    }
  }

  // Vamos criar uma instância de Cachorro
  const cachorro = new Cachorro('Rex', 10, 'vira-lata')
  cachorro.nome // ok
  cachorro.idade // ok
  cachorro.raca // ok
  cachorro.comer() // ok
  cachorro.latir() // ok
}
