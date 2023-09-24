// Funções assíncronas
{
  // O que muda de uma para a outra é o async e o tipo de retorno
  // que precisa ser sempre uma instancia de uma promise
  async function somar(a: number, b: number): Promise<number> {}

  // Exemplo de função que não retorna nada
  async function log(message: string): Promise<void> {}

  // No geral, vamos apenas tipar os parâmetros
  // o tipo de retorno é inferido pelo TypeScript
  // exceto em casos muito específicos
  // aqui ele já vai inferir para Promise automaticamente
  async function bar(message: string) {
    // o retorno é string
    return message
  }

  // chamar uma função com um tipo diferente de parâmetro vai dar um erro
  bar(1) // erro

  // Assim como retornar um tipo que não for especificado no retorno
  // vai dar um erro
  async function returnError(a: string): Promise<number> {
    return a // erro
  }
}

// formas de declarar uma função
{
  // Funções nomeadas

  // Function Declaration
  async function foo(a: number, b: number) {}

  // Named Function Expression
  // É uma Function Expression com nome
  // É útil para debugar porque se tivermos erros
  // o nome da função aparece no stack trace
  const somar = async function sum(a: number, b: number) {}

  // Funções anônimas

  // Function Expression
  const bar = async function (a: number, b: number) {}

  // Arrow Function
  const sum = async (a: number, b: number) => {}

  // Short Arrow Function
  const shortsum = async (a: number, b: number) => a + b

  // IIFE - Immediately Invoked Function Expression
  // Função que é executada imediatamente
  // Já falamos dela antes bem rápido
  ;(async function () {
    console.log('Executou!')
  })()

  // IIFEs podem ter arrow functions
  ;(async () => {
    console.log('Executou!')
  })()
}

// Callbacks
{
  function lerArquivo(caminho: string, cb: (err: unknown | null, data: string | null) => void) {
    algumaFuncaoAssincrona(caminho)
      .then((data: string) => cb(null, data))
      .catch((err: unknown) => cb(err, null))
  }
}
