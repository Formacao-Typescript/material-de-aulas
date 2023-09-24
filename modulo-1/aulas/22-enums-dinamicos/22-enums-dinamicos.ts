// Enums dinamicos
// Rode essa pasta com o comando npx tsc -p ./tsconfig.json
// para ver o resultado da compilação
// troque a opção preserveConstEnums para true ou false e veja a diferença

{
  // Múltiplos tipos de valores
  enum Cores {
    Azul = '#0000ff', // string
    Branco = 255, // number
    Vermelho = 0xff0000, // hex
    Verde = 0x00ff00 // hex
  }
}

{
  // Múltiplos tipos computados
  enum Cores {
    Azul = '#0000ff', // string
    Branco = 255, // number
    Vermelho = 0xff0000, // hex
    Verde = 0x00ff00, // hex
    Total = 10 + 10, // soma
    Computado = 'Olá'.length // computado
  }
}

// Declaration merging (evitar)
{
  enum Cores {
    Azul = '#0000ff' // string
  }

  // Declaration merging
  enum Cores {
    Branco = 255, // number
    Vermelho = 0xff0000, // hex
    Verde = 0x00ff00, // hex
    Total = 10 + 10, // soma
    Computado = 'Olá'.length // computado
  }

  const cor: Cores = Cores.Total // 20
}

// Declaration merging implícito
{
  enum A {
    a,
    b,
    c
  }

  enum A {
    d // Erro
  }
}

// Declaration merging explícito
{
  enum A {
    a,
    b,
    c
  }

  enum A {
    d = 3
  }
}
