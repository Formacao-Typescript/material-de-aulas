{
    /**
     * Required só funciona em objetos
     * Ele vai receber um objeto e retornar o mesmo objeto
     * com todas as chaves sendo opcionais
     */
    interface Funcionario {
        nome?: string
        idade?: number
        id?: string
        cracha?: number
    }
    
    // Aqui todas as chaves são opcionais
    type FuncionarioRequired = Required<Funcionario>

    // Porém, o Required só funciona para o primeiro nível
    interface FuncionarioComplexo extends Funcionario {
        // Aqui temos outro objeto dentro do primeiro
        gestor: Funcionario
    }
    // Quando aplicamos o Required, a chave `gestor` é obrigatória
    type ComplexoParcial = Required<FuncionarioComplexo>
    const erro: ComplexoParcial = {
        cracha: 1,
        // Mas mesmo se não passarmos nada, está tudo bem
        // pois o tipo interno de `gestor` ainda é o Funcionario
        gestor:{}
    }

    // COMO FUNCIONA POR BAIXO DOS PANOS?

    type required<Base> = {
        // Isso é o que chamamos de mapped type
        // Vamos ver mais sobre eles na FTS Intermediária
        [Chave in keyof Base]-?: Base[Chave]
    }

    type novoFuncionario = required<Funcionario>
}