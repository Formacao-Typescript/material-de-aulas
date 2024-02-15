{
    /**
     * O Pick é um tipo que vai recriar um objeto a partir das chaves
     * escolhidas de outro objeto. Ele só funciona com interfaces
     */
    interface Funcionario {
        nome: string
        idade: number
        id: number
        cracha: number
        gestor?: Funcionario
    }

    // Aqui estamos construindo um objeto a partir de outro objeto
    type Usuario = Omit<Funcionario, 'cracha' | 'gestor' >
    const alice: Usuario = {
        id: 1,
        nome: 'Alice',
        idade: 20
    }

    // COMO FUNCIONA POR BAIXO DOS PANOS


    // Veja que o generic "Escolha" é um constrained generic
    type exclude<Base, Escolha extends keyof Base> = {
        [Chave in Exclude<keyof Base, Escolha>]: Base[Chave]
    }

    type FuncionarioSemCracha = exclude<Funcionario, 'cracha'>
}