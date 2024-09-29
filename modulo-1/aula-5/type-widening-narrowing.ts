{
    // O TypeScript tem duas formas de lidar com inferência de tipos
    // Elas são chamadas de Widening e Narrowing.
    // Widening é quando o TypeScript tenta inferir o tipo mais amplo possível para uma variável.
    // Narrowing é quando o TypeScript tenta inferir o tipo mais específico possível para uma variável.

    // Widening tem menos casos de uso porque é mais comum quando inicializamos variáveis
    // Ou quando usamos let, o que permite modificação

    // Um exemplo de widening é quando o ts infere o tipo de uma variável nula como any
    // Mas isso só funciona se strictNullChecks estiver desativado
    let x = null; // x é do tipo any, ele é "ampliado" (widened) para any
    x = 10 // aqui poderíamos atribuir qualquer valor a x, pois ele é do tipo any

    // Se strictNullChecks estiver ativado, o TypeScript vai inferir o tipo null como null
    x = 'abc' // Erro: Type 'string' is not assignable to type 'null'

    // Isso também acontece com promises
    let p = Promise.resolve(null)
    p = Promise.resolve(10) // aqui poderíamos atribuir qualquer valor a p, pois ele é do tipo Promise<any>

    // Agora experimente trocar o strictNullChecks para true no tsconfig.json dentro dessa pasta

    // Outro exemplo clássico de widening é quando atribuimos strings ou números
    let y = 'uma string' // O tipo é inferido como string e não como 'uma string'
    let z = 10 // O tipo é inferido como number e não como 10

    // O mesmo vale para arrays e objetos
    let arr = [1, 2, 3, 'string'] // O tipo é inferido como (string | number)[]
    let obj = { a: 1, b: 2 } // O tipo é inferido como { a: number, b: number }

    // Funções também sofrem widening já que o tipo de retorno aqui é number
    function getStatus() {
        return 1
    }

    // Por fim, qualquer tipo que for unido com any ou unknown vai ser expandido para ou any ou unknown
    type QualquerAny = string | any // Any
    type QualquerUnknown = string | unknown // unknown

    // Enums são um caso especial de widening porque eles podem também ser reduzidos
    enum Status {
        OK = 200,
        NOT_FOUND = 404
    }

    let ok = Status.OK // O tipo é inferido como Status, isso é um widening
    const notFound = Status.NOT_FOUND // O tipo é inferido como Status.NOT_FOUND, isso é um narrowing
}

{
  // Narrowing é o oposto, é quando temos um tipo ampliado e fazemos com que ele fique mais específico
  // Podemos fazer isso manualmente
  let x: any = 10
  let y = x as number // aqui estamos reduzindo o tipo x de any para number manualmente

  // Mas também podemos estreitar (ou reduzir) nossos tipos usando verificações
  // e o TypeScript é inteligente o suficiente para saber quando temos um escopo diferente do outro

  if (typeof x === 'number') {
    let z = x // aqui o tipo de x será number
  }

  // podemos também reduzir com switch
  switch (typeof x) {
    case 'number':
      let z = x // aqui o tipo de x é number
      break
    case 'string':
      let w = x // aqui o tipo de x é string
      break
  }

  // Outra possibilidade é reduzir usando instanceof
  if (x instanceof Error) {
    x.message // Aqui X é do tipo Error
  }

  // Existe outras possibilidades como a redução discriminada
  type Cachorro = { latir: () => void }
  type Gato = { miar: () => void }

  // Forçamos uma conversão aqui só para mostrar o exemplo
  const pet: Cachorro | Gato = {} as Cachorro | Gato

  if ('latir' in pet) {
    pet.latir() // Aqui pet é do tipo Cachorro
  } else {
    pet.miar() // Aqui pet é do tipo Gato
  }

  // Isso acontece porque o TypeScript consegue inferir o tipo de duas classes que tem membros completamente diferentes
  // Logo, se a variável tem um membro de uma classe que não existe em outra, ele pode saber qual é a classe que estamos falando
  // Vamos ver mais sobre isso em discriminated unions

  // Outro tipo de narrowing acontece com null checks
  let algoNulo: string | null = 'string'

  if (algoNulo !== null) {
    algoNulo // Aqui algoNulo é do tipo string
  }

  // Validações nativas do JavaScript também funcionam

  if (Array.isArray(x)) {
    x.map(() => {}) // x agora é do tipo any[]
  }

  // Podemos forçar narrowing em funções que levam unions
  // DESAFIO: Tente transformar essa função de forma que o retorno
  // seja a string em uppercase ao invés de lowercase
  function uppercase<T extends string | string[]>(s: T): T {
    if (Array.isArray(s)) {
      // o TS sabe que aqui o tipo é string[]
      return s.map(uppercase) as any
    }
    // Aqui fora o tipo é string
    return s.toUpperCase() as any
  }

  uppercase('String') // veja como o tipo está sendo definido aqui
  uppercase(['string']) // Aqui o tipo já é expandido para string[]

  // Narrowing também pode ser feito com TypeGuards e Assertion Functions, vamos ver isso nas próximas aulas
}
