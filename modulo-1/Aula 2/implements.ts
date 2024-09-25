{
  class Pessoa {
    constructor(public id: string, public nome: string) {}
  }

  class Funcionario extends Pessoa {
    constructor(id: string, nome: string, public salario: number) {
      super(id, nome)
    }
  }

  const Joao: Pessoa = new Pessoa('1', 'João')
  Joao.id

  const Ana: Funcionario = new Funcionario('2', 'Ana', 2000)
  Ana.salario
}

// ---------------- //

{
  interface Pessoa {
    id: string
    nome: string
  }

  interface Funcionario extends Pessoa {
    salario: number
  }

  const Joao: Pessoa = {
    id: '1',
    nome: 'João'
  }

  const Ana: Funcionario = {
    id: '2',
    nome: 'ana',
    salario: 2000
  }
}

// ---------------- //

{
  type Pessoa = { id: string; nome: string }
  type Funcionario = Pessoa & { salario: number }
}

{
  interface Pessoa {
    id: string
    nome: string
  }

  class Funcionario extends Pessoa {}
}

// --------------- //

{
  interface Pessoa {
    id: string
    nome: string
    dizerOi(nome: string): void
    dizerTchau(nome: string): void
  }

  class Funcionario implements Pessoa {
    constructor(public id: string, public nome: string, public salario: number) {}

    dizerOi(nome: string): void {
      console.log(`Oi, ${nome}`)
    }

    dizerTchau(nome: string): void {
      console.log(`Tchau, ${nome}`)
    }
  }

  function dizerOi(entidade: Pessoa, nome: string) {
    entidade.dizerOi(nome)
  }
}

// -------- //

{
  interface Encontravel {
    id: string
  }

  interface Datavel {
    dataCriacao: Date
    dataAtualizacao: Date
  }

  interface SoftDeletable {
    deletedAt: Date | null
  }

  class Pessoa implements Encontravel, Datavel, SoftDeletable {
    dataCriacao: Date
    dataAtualizacao: Date
    deletedAt: Date | null

    constructor(public id: string) {
      this.dataCriacao = new Date()
      this.dataAtualizacao = new Date()
      this.deletedAt = null
    }
  }

  interface Pagavel {
    dataPagamento: Date
    salario: number
  }

  class Funcionario extends Pessoa implements Pagavel {
    constructor(public id: string, public salario: number, public dataPagamento: Date) {
      super(id)
    }
  }

  const Joao: Pessoa = new Pessoa('1')

  function findEntity(entidade: Encontravel, entidades: Encontravel[]) {
    return entidades.find((e) => e.id === entidade.id)
  }
}

{
  abstract class Encontravel {
    constructor(public id: string) {}
  }
}
