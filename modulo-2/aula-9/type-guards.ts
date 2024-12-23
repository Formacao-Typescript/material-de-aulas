{
    /**
     * Type Guards é o nome de uma classe de funções que incluem assertion functions
     * essas funções só servem para garantir que um tipo é ele mesmo tanto em
     * compilação quanto em runtime
     *
     * Para facilitar, chamamos funções que retornam um erro de assertion functions
     * e type guards são um tipo específico de assertion functions que não retornam um erro
     * mas sim um boolean validando se um tipo é ele mesmo ou não
     */

    function isNumber(n: unknown): n is number {
        //                         ^ não temos o asserts aqui
        return typeof n === 'number'
    }

    /**
     * Diferente de assertion functions
     * os type guards vão sempre retornar um boolean
     * que indicam se o tipo é correto ou não
     * dessa forma eles devem ser usados sempre dentro 
     * de validações que aceitem esse retorno
     * ao invés de serem usados individualmente com uma chamada
     * sem retorno
     */
    if (isNumber(1)) {
        // Aqui dentro o tipo é number
    }
}

{
    // A principal diferença é que o type guard só funciona dentro de um escopo
    function isNumber(n: unknown): n is number {
        return typeof n === 'number'
    }

    const talvezNumero: string | number = '' as string | number

    talvezNumero.toString() // Não temos as validações de número aqui

    if (isNumber(talvezNumero)) {
        // Aqui talvezNumero é number
        talvezNumero.toExponential(2)
    } else {
        // Aqui ele é string
        talvezNumero.split(',')
    }

    // aqui ele ainda é string | number


    /**
     * Pense que type guards são como discriminated unions
     * que vão funcionar em runtime
     */
}
