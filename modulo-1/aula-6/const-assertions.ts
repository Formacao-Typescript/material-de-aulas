{
    // Uma outra forma de tratarmos narrowing que merece sua própria aula são os tipos constantes
    // ou as "Const Assertions"

    // Quando temos um valor que não se altera, podemos utilizar a keyword const
    const x = 'lucas' // o tipo é o mais específico possível, 'lucas'

    // Mas isso não vale pra objetos
    const obj = {
        nome: 'lucas'
    } // Aqui o tipo é { nome: string }

    // Para isso, podemos utilizar as "const assertions" para poder dizer que esse objeto é completamente imutável
    const objImutavel = {
        nome: 'lucas'
    } as const // Aqui o tipo é { readonly nome: 'lucas' }

    // E essa propriedade é passada para objetos aninhados
    const objAninhado = {
        nome: 'lucas',
        endereco: {
            rua: 'rua',
            numero: 1
        }
    } as const // Aqui o tipo é { readonly nome: 'lucas', readonly endereco: { readonly rua: 'rua', readonly numero: 1 } }

    // Além de fazer um narrow do tipo 'as const' também faz com que os membros do objeto sejam imutáveis
    // então não podemos associar novos valores com eles

    // No caso de arrays, o tipo não vai ser mais aberto para o tipo maior
    const arr = [1, 2] // Aqui o tipo é number[]
    const arrImutavel = [1, 2] as const // Aqui o tipo é readonly [1, 2]

    // Isso é o que chamamos de tupla, e ela é muito poderosa no TypeScript

    // Se tentarmos criar uma função que aceita um array de tamanho 2, e tentarmos passar um array normal, teremos um erro
    const fn = (a: number, b: number) => a + b
    fn(...arr) // erro

    // Mas se passarmos o array imutável, não teremos erro
    fn(...arrImutavel) // ok porque o TS sabe que temos 2 elementos apenas
}

{
    // Desde o TS 5.0
    // Const assertions também funcionam em type parameters
    // podemos dizer que um parâmetro de tipo é constante
    const fn = <const T>(a: T) => a
    fn(1) // 1, e veja que tuso é inferido como 1

    // Isso é útil porque se tivermos uma função que não tem um tipo constante como esse
    const fnSimples = <T>(a: T) => a

    // Poderíamos passar um objeto que ele seria inferido como o tipo mais aberto
    fnSimples({ nome: 'lucas' }) // { nome: string }

    // Mas se tivermos um tipo constante, ele será inferido como constante
    fn({ nome: 'lucas' }) // { readonly nome: 'lucas' }

}
