// sintaxe
{
  const enum Cores {
    VERMELHO,
    AZUL,
    AMARELO
  }

  const cor: Cores = Cores.AZUL
}

// const enums não existem em runtime
{
  const enum Cores {
    VERMELHO,
    AZUL,
    AMARELO
  }

  // O const enum não pode ser acessado em runtime
  // como um objeto
  // então temos que acessar ele diretamente
  // pela sua chave
  const cor: Cores = Cores[0] // erro
  const corOk: Cores = Cores['AMARELO'] // ok
}

// Const enums não podem ser iterados
{
  const enum Cores {
    VERMELHO = 'red',
    AZUL = 'blue',
    AMARELO = 'yellow'
  }

  const cor: Cores = Cores['VERMELHO'] // red
  const corValue = 'red'

  // Não podemos acessar o const enum pelo valor
  const corKey: Cores = Cores[corValue] // erro

  // Mesmo se tentarmos puxar as chaves
  const chaves = Object.keys(Cores) // erro
}
