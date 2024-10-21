{
    /**
     * Como vimos antes, tipos são conjuntos. E conjuntos tem propriedades únicas
     * como a união e intersecção. O mesmo vale para os tipos; podemos unir dois tipos
     * para criar um tipo composto ou então estreitar um tipo para ser apenas
     * a intersecção de várias propriedades.
     */

    // Um union é representado pelo símbolo |
    type StringOuNumber = string | number // esse tipo aceita ambos string e number
    type StringNumberBool = string | number | boolean

    /**
     * Uma union é caracterizada pela abertura (widening) de um tipo.
     * Quando estamos unindo um tipo com outro tipo, estamos abrindo 
     * este tipo para mais possibilidades, como fizemos acima com string e number
     */

    // O tipo de uma union é a própria union, portanto não podemos
    // associar um tipo string | number para um tipo string apenas

    let stringOuNumber: StringOuNumber = Math.random() > 0.5 ? '1' : 1
    // Vamos ter um erro
    // @ts-expect-error
    const soString: string = stringOuNumber

    // Para podermos fazer uma associação deste tipo
    // temos que fazer um narrowing
    if (typeof stringOuNumber === 'string') {
        // aqui, stringOuNumber é string
        const soString: string = stringOuNumber.toUpperCase()
    }

    if (typeof stringOuNumber === 'number') {
        // aqui ele é number
        const soNumber: number = Number(stringOuNumber.toPrecision(2))
    }

    // Embora uma Union seja uma união, quando usamos tipos
    // assim, ele só terá métodos que estão presentes em ambos
    // os tipos da união
    const s: StringOuNumber = stringOuNumber.toLocaleString()

    // Por exemplo, acima só temos 3 possibilidades de métodos que podemos chamar

    // Da mesma forma, a união de objetos só vai ter
    // propriedade que são comuns em ambos
    interface gato {
        correr(): void
        miar(): void
    }

    interface cachorro {
        correr(): void
        latir(): void
    }

    const animal: cachorro | gato = {} as cachorro | gato

    // @ts-expect-error
    animal.latir() //erro
    // @ts-expect-error
    animal.miar() // erro
    animal.correr() // presente em ambos
}


{
    /**
     * Intersecções são o oposto, elas são representadas por &
     * e são usados para combinar tipos em um só. Pense que a union
     * é um 'or' enquanto uma intersection é um 'and'
     */

    interface error {
        message: string
    }

    interface livro {
        titulo: string
        autor: string
    }

    type LivroComErrorMessage = livro & error
    const l: LivroComErrorMessage = {
        autor: 'vem do livro',
        titulo: 'vem do livro',
        message: 'vem do error'
    }

    // podemos fazer com tipos simples também
    type Extends = livro & { isbn: string } // agora livro tem isbn

    /**
     * Isso pode ser complicado de entender porque não é tão intuitivo
     * mas a ideia é que seja parecido com teoria de conjuntos que vemos na escola
     * quando temos a intersecção de dois conjuntos, temos as propriedades presentes em ambos
     */

    // No entanto, para tipos primitivos, podemos cair em uma rua sem saída
    type Never = string & number

    // O tipo acima é never porque nenhuma propriedade de string está presente em number
    // e vice versa, então não temos intersecções entre eles, portanto ele não pode ser
    // atribuido

    // Uma coisa legal que podemos fazer com intersections
    // é permitir strings abertas mas manter o IDE sugerindo
    // itens no intellisense, por exemplo:
    type StringWithSuggestions<Suggestion> = Suggestion | (string & {})
    type Action = 'Purchase' | 'Sale' | 'Return'

    // O tipoVenda vai sugerir uma das três strings acima
    // mas também vai aceitar strings arbitrárias
    const tipoVenda: StringWithSuggestions<Action> = 'Purchase'
    const tipoVenda2: StringWithSuggestions<Action> = 'NãoPresente'

}
