{
  /**
   * Generics podem ser opcionais, ou seja, eles podem ter um valor padrão
   * que é usado quando não passamos um tipo para o generic
   * para isso usamos o operador `=`
   * por exemplo
   */
  function convert<T, R = any>(x: T): R {
    return x as unknown as R
  }

  // Agora podemos passar qualquer tipo para o generic
  convert<string, number>('a') // R é number
  // Mas se não passarmos nada
  convert<string>('a') // R é any

  // Isso é bastante útil quando queremos um generic que não é obrigatório
  // por exemplo, se quisermos um generic que pode ser qualquer tipo
  // mas que por padrão é string
  function log<T = string>(x: T): void {
    console.log(x)
  }

  /**
   * Quando digitamos log( e apertamos ctrl + espaço
   * o TS vai sugerir que o generic é string
   *
   * Mas se passarmos um número o TS vai trocar o tipo do generic
   * para number
   */
  log(1) // T é number
  log('a') // T é string
}
