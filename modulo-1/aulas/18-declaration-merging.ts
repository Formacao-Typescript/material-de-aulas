{
    // interfaces tem uma peculiaridade de serem abertas, ou seja, podem ser extendidas
    interface Pessoa {
      nome: string;
      idade: number;
    }
  
    // se a gente declarar outra interface com o mesmo nome
    // ela vai ser extendida com os novos campos
    interface Pessoa {
      telefone: string;
    }
  
    const pessoa: Pessoa = {
      nome: 'Luiz',
      idade: 30,
      telefone: '123456789' // novo campo da interface
    }
  
    // a gente não consegue fazer isso com tipos
    type Carro = {
      nome: string;
      ano: number;
    }
    type Carro = {
      placa: string // vai dar erro
    }
  
    // isso é chamado de declaration merging
    // mas é considerado uma má prática
    // porque podemos ter a mesma interface em vários lugares diferentes
    // e isso pode gerar confusão
  }