{
    /**
     * ReturnType traz o retorno de uma função 
     */
    function foo () {
        return 1
    }

    // Esse tipo será number, mas experimente mudar o retorno da função!
    type RetornoFoo = ReturnType<typeof foo>
    const numero: RetornoFoo = 1

    // Como o ReturnType só aceita funções como parâmetros
    // Não podemos passar alguns tipos
    type T1 = ReturnType<unknown>
    type T2 = ReturnType<any> // Any funciona porque está em todos os tipos
    type T3 = ReturnType<never> // never funciona porque é associável a todos os tipos
    type T4 = ReturnType<{}>
    type T5 = ReturnType<Function> // Function é o tipo do construtor da função e não pode ser usado

    // POR BAIXO DOS PANOS

    type returnType<T extends (...args: any[]) => any> = 
        T extends (...args: any[]) => infer R ? R : unknown

    type RetornoFoo2 = returnType<typeof foo>
    type t1 = returnType<unknown>
    type t2 = returnType<any>
    type t3 = returnType<never>
    type t4 = returnType<{}>
    type t5 = returnType<Function>
}