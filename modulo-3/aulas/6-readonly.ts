{
    /**
     * Readonly vai transformar uma interface em um objeto imutável
     */
    interface Funcionario {
        nome: string
        idade: number
        id: string
        cracha: number
    }

    // Se criarmos um objeto agora
    const ana: Funcionario = {
        nome: 'Ana',
        idade: 28,
        id: '1',
        cracha: 1
    }

    // E modificarmos ele, está tudo bem
    ana.id = '2'

    // Mas se aplicarmos readonly
    type ReadonlyFuncionario = Readonly<Funcionario>
    const bob: ReadonlyFuncionario = {
        nome: 'Bob',
        idade: 28,
        id: '1',
        cracha: 1
    }
    // Não vamos conseguir modificar depois de criar
    bob.id = '2'

    // COMO FUNCIONA POR BAIXO DOS PANOS

    type customReadonly<Base> = {
        // O mesmo mapped type, porém adicionando uma chave readonly
        readonly [Chave in keyof Base]: Base[Chave]
    }
    const alice: customReadonly<Funcionario> = {
        nome: 'Alice',
        idade: 28,
        id: '1',
        cracha: 1
    }
    alice.id = '2'
}