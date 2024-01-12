{
  /**
   * Generics são como se fossem parâmetros para seus tipos
   *
   * Se tivermos funções como essa, vamos ter que criar uma função para cada nome
   */
  function greetLucas() {
    return 'Hello Lucas'
  }

  function greetAna() {
    return 'Hello Ana'
  }

  // Mas podemos ter parâmetros para variar o retorno
  function greet(name: string) {
    return `Hello ${name}`
  }

  greet('Ana')

  /** ----COM GENERICS----- */

  // Generics são a mesma coisa
  // Se tivermos um tipo muito específico, podemos usar um generic para variar o tipo
  type GreetLucas = 'Hello Lucas'

  // Com generics, podemos definir um parâmetro para nosso tipo
  // Eles vem no formato: type Nome<Generic>
  // Para definir mais de um: type Nome<G1, G2>
  // @ts-expect-error Ignoramos o erro por enquanto (veja a aula de constrained generics)
  type Greet<Nome, TimeOfDay> = `Hello ${Nome}, good ${TimeOfDay}`

  // Esse é o equivalente à nossa função Greet(nome)
  // @ts-expect-error
  const x: Greet<'Ana', 'morning'>

  /** --------- */

  /**
   * Tipos utilitários são a funcionalidade mais famosa de generics
   * Podemos usar um generic para criar outro tipo generico
   * O TS mesmo tem vários tipos que já são genéricos como o Array e o Record
   */
  type StringArray = Array<string>

  // Um tipo comum que é criado é o Nullable<T>
  type Nullable<Type> = Type | null
  type NullableString = Nullable<string>
  type NullableNumber = Nullable<number>
}
