// Record Type
{
    // Um tipo record
    type ToDo = {
      titulo: string
      descricao: string
    }
  
    const todo: ToDo = {
      titulo: 'Assistir séries',
      descricao: 'Lembrar os detalhes',
    }
  }
  
  // Dictionary Type
  {
    type ToDo = {
      titulo: string
      descricao: string
    }
  
    // Temos um erro, pois o typescript não sabe que o objeto labels é um dicionário
    const todo: ToDo = {
      titulo: 'Assistir séries',
      descricao: 'Lembrar os detalhes',
      labels: {
        importante: true
      }
    }
  
    // Para resolver isso, podemos usar uma index signature
    type ToDoDict = {
      titulo: string
      descricao: string
      labels: {
        // Aqui dizemos que o objeto labels é um dicionário, onde a chave é uma string e o valor é um boolean
        // não importa qual é a chave, ela sempre será uma string e o valor sempre será um boolean
        [nome: string]: boolean
      }
    }
  
    // Agora não temos mais erro
    // podemos adicionar quantas propriedades quisermos
    const todo2: ToDoDict = {
      titulo: 'Assistir séries',
      descricao: 'Lembrar os detalhes',
      labels: {
        importante: true,
        atrasado: true,
        pessoal: true
      }
    }
  }