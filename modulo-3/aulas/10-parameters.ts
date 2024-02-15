{
    /**
     * Parameters vai trazer a lista de todos os parâmetros de uma função
     * em uma tupla
     */
    function soma (a: number, b: number) {
        return a+b
    }

    // Veja que é um array com apenas dois elementos
    type params = Parameters<typeof soma>

    // Podemos usar esses parâmetros em outra função
    function somaGenerica(...params: params) {
        return params[0] + params[1]
    }

    // COMO FUNCIONA POR BAIXO DOS PANOS

    type parameters<T extends (...args: any[]) => any> = 
        T extends (...args: infer P) => any ? P : never

    type meuparams = parameters<typeof soma>
    function somaGenerica2(...params: meuparams) {
        return params[0] + params[1] + params[2] // veja que não podemos passar mais de 2 elementos
    }
}