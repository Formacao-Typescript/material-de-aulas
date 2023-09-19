// sintaxe
{
    // uma interface vai ser SEMPRE um objeto
    // isso significa que tudo que a gente aprenderu 
    // sobre objetos, vai ser valido para interfaces
    interface Pessoa {
      nome: string;
      readonly idade: number;
      nacionalidade?: string; // ? = opcional
    }
  
    // incluindo index signatures
    interface Label {
      [name: string]: boolean;
    }
  
    // lembrando que index signatures podem ser readonly
    // e tabém não podem aparecer com mais de um tipo de valor
    interface Erro {
      readonly [name: string]: boolean;
      numero: number // erro
    }
  
    // a index signature precisa ter o mesmo tipo de valor
    // do resto das propriedades combinadas
    interface Multipla {
      titulo: string
      descricao: string
      data: Date
      done: boolean
      [outro: string]: string | Date | boolean
    }
  
    // uma interface vazia vai permitir qualquer coisa
    interface Vazio {}
    const vazio: Vazio = { nome: 'João' } // ok
    // mas a gente não consegue usar
    vazio.nome // erro
  
    // esse é o mesmo caso do tipo {}
    const objeto: {} = { nome: 'João' } // ok
    objeto.toString() // ok
    vazio.toString() // ok
  }
  
  // uso
  {
    // a interface se comporta igual a um type alias
    // ou a um objeto
    interface Pessoa {
      nome: string
      idade: number
      nacionalidade: string
    }
  
    const pessoa: Pessoa = {
      nome: 'João',
      idade: 20,
      nacionalidade: 'Brasil'
    }
  
    // podemos usar interfaces em funções
    function imprimirPessoa(pessoa: Pessoa) {
      console.log(pessoa.nome)
    }
  }