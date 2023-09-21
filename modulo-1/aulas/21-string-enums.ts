// Sintaxe
{
    // Esse é um enum de STRINGS
    // O valor precisa ser manualmente atribuido
    enum Estado {
      SP = 'São Paulo',
      RJ = 'Rio de Janeiro',
      MG = 'Minas Gerais'
    }
  
    // Podemos inicializar o enum com outro enum 
    enum Direcao {
      CIMA = 'Cima',
      BAIXO = 'Baixo',
      ESQUERDA = 'Esquerda',
      DIREITA = 'Direita'
    }
  
    enum OutraDirecao {
      NORTE = Direcao.CIMA,
      SUL = Direcao.BAIXO,
      LESTE = Direcao.DIREITA,
      OESTE = Direcao.ESQUERDA
    }
  
    // O uso é o mesmo de um enum normal
    let direcao: Direcao = Direcao.CIMA
    console.log(direcao) // Cima
  
    function mover (direcao: Direcao) {
      console.log(direcao)
    }
  
    // porém não podemos atribuir um valor que não seja do enum
    // string enums não aceitam strings diretamente
    const direcaoComoString: Direcao = 'Cima' // erro
  
    // Podemos usar a string para acessar o valor do enum
    // Veja o tipo inferido: Direcao.CIMA
    const valorPorString = Direcao['CIMA'] // Cima
  
    // ou o contrário
    // porém a tipagem não é inferida
      // O TS vai reclamar porém esse é um objeto válido no runtime
    // e temos um any
    // Isso é equivalente a Direcao['CIMA']
    const chavePorValor = Direcao[valorPorString.toUpperCase()] // Cima
  
    // Apesar de o valor final ser o correto
    // o compilador não consegue inferir o tipo aqui
    // e ele acaba sendo tipado como any
    // e o compilador vai reclamar
    const NorteTraduzido = Direcao[OutraDirecao.NORTE] // Cima
  
    // Podemos tipar desse jeito
    // Vamos ver esses operadores mais para frente!
    const NorteTraduzidoComTipo: Direcao = Direcao[OutraDirecao.NORTE.toUpperCase() as Uppercase<typeof OutraDirecao.NORTE>] // Cima
  }