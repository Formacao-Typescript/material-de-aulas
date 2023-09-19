// o tipo object
{
    // object (com o minúsculo) é um objeto válido do JavaScript
    // ele pode ser qualquer coisa desde que não seja nulo
    const obj: object = { }
    const obj2: object = null // erro
  
    // mas a gente não pode fazer nada com esse objeto
    // na verdade ele é um pouco mais definido do que 'any'
    // estamos dizendo que a gente quer um objeto mas não nos importamos com o que tem dentro dele
    // então não podemos acessar as propriedades dele
    obj.foo // erro
    obj2.foo // erro
    // não vamos nem ter o intellisense dele
    // ele é um tipo de escape, como se fosse o unknown para objetos
  
    // Mas a gente ainda pode executar métodos em cima dele
    // por exemplo, o toString
    obj.toString() // funciona
    const chaves = Object.keys(obj) // funciona e as chaves são string[]
  }
  
  // Object (com o maiúsculo) é um tipo válido do TypeScript
  {
    // Object se refere à instancias de Object
    // que é o objeto global do JavaScript
    const obj: Object = { }
    // Tipos primitivos não são instancias de Object
    const obj2: Object = null // erro
  
    // Mas qualquer coisa que seja criada com new é uma instancia de Object
    // porque no JavaScript tudo é um objeto
    const obj3: Object = new Object() // funciona
    const obj4: Object = new Date() // funciona
    const obj5: Object = new String() // funciona
    const obj6: Object = new Number() // funciona
    const obj7: Object = new Boolean() // funciona
    const obj8: Object = new Function() // funciona
    const obj9: Object = new Array() // funciona
  
    // Porém a gente só vai ter acesso aos métodos de Object
    // e não aos métodos dos outros tipos
    // Veja o intellisense
    obj3.toString() // funciona
    obj4.toISOString() // erro
  } 