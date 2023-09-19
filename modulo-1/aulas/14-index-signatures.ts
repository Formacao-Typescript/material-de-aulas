{
    type ToDo = {
        titulo: string
        descricao: string
    }

    const todo: ToDo = {
        titulo: 'Assistir séries',
        descricao: 'Tomar notas'
    }
}

{
    type ToDo = {
        titulo: string
        descricao: string
    }

    const todo: ToDo = {
        titulo: 'Assistir séries',
        descricao: 'Tomar notas',
        labels: {
            importante: true
        }
    }

    type ToDoDict = {
        titulo: string
        descricao: string
        labels: {
            [nome: string]: boolean
        }
    }

    const todo2: ToDoDict = {
        titulo: 'Assistir séries',
        descricao: 'Tomar notas',
        labels: {
            importante: true,
            pessoal: true,
            atrasado: true,
        }
    }
}