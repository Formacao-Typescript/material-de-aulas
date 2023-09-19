// Empty object type
{
    // Podemos definir um objeto vazio como tipo
    let obj: {} = {};
  
    // Todos os valores, exceto null e undefined são atribuídos a um tipo de objeto vazio
    obj = 'value';
    obj = 1;
    obj = true;
    obj = [];
    obj = {};
    obj => {};
    obj = null; // erro
    obj = undefined; // erro
  
    // mas a gente pode acessar todas as propriedades de um objeto vazio
    const newObj: {} = {}
    newObj.toString(); // ok mas sem intellisense
  }