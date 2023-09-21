// Sintaxe de enums simples
{
    // Valores atribuidos automaticamente
    // Esses são enumeradores SIMPLES
    enum Direcao {
      Norte,
      Sul,
      Leste,
      Oeste
    }
  
    // É a mesma coisa que
    enum Direcao2 {
      Norte = 0,
      Sul = 1,
      Leste = 2,
      Oeste = 3
    }
  
    // Você pode manualmente atribuir valores também
    // esses são enumeradores NUMÉRICOS
    enum Direcao3 {
      Norte = 1,
      Sul = 2,
      Leste = 3,
      Oeste = 4
    }
  }
  
  // Uso
  {
    enum Direcao {
      Norte,
      Sul,
      Leste,
      Oeste
    }
  
    // Você pode usar o enum como um tipo
    let direcao: Direcao = Direcao.Norte;
  
    // Você pode usar também como um valor
    if (direcao === Direcao.Norte) {
      // ...
    }
  
    // O jeito mais comum é utilizar como um parâmetro
    function mover(direcao: Direcao) {
      if (direcao === Direcao.Norte) {
        // ...
      }
    }
  
    // Como enums são objetos em runtime
    // você pode usar eles como objetos em funções
    function foo (objeto: { Norte: number}) {
      return objeto.Norte
    }
    // Funciona porque o enum é um objeto
    // que tem uma propriedade Norte
    // com um valor numérico
    foo(Direcao) // 0
  }
  
  // Associando valores
  {
    enum Direcao {
      Norte,
      Sul,
      Leste,
      Oeste
    }
  
    // Podemos associar valores a cada enum direto do enum
    const Norte: Direcao = Direcao.Norte;
    // Se o valor numérico existir no enum
    // ele também pode ser usado como um valor
    const Sul: Direcao = 1
    // Porém não podemos acessar o valor da chave pelo indice
    const Oeste: Direcao = Direcao[3]
  
    // esse funciona porque a nossa chave é uma string
    // ele vai nos dar o VALOR do enum, que é 3
    const OutroOeste = Direcao['Oeste']
  
    // Da mesma forma, podemos mapear o valor para uma chave
    // aqui temos a string 'Oeste'
    // isso é equivalente de termos um objeto e pegarmos o valor da chave
    const chaveOeste = Direcao[OutroOeste]
  
    // Nem se o número 'não existir' no enum, 
    // mas isso é algo relativamente recente
    // inclusive era um dos argumentos contra o uso de enums
    const Leste: Direcao = 8 // erro
  }
  
  {
    enum Level {
      Info,
      Warn,
      Error,
      Debug
    }
  
    function createLogger (level: Level) {
      switch (level) {
        case Level.Info:
          return console.log
        case Level.Warn:
          return console.warn
        case Level.Error:
          return console.error
        case Level.Debug:
          return console.debug
      }
    }
  
    // Enumeradores numéricos são ótimos para comparações
    // e para mapear valores para chaves
    const levelDoUsuario: number = 1
    if (levelDoUsuario > Level.Debug) {
      createLogger(Level.Debug)
    }
  }