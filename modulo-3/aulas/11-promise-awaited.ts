{
    /**
     * Promise é um tipo nativo do TypeScript, ele está presente na 
     * lib.es2015.promise.d.ts, que é a standard library do TS
     * Já o tipo Awaited é um utility type que vai trazer o resultado positivo de uma promise
     */
    async function soma (a: number, b: number) {
        return a+b // isso é uma promise
    }

    const res = soma(1,2)
    res.then((resultado) => {}) // Quando usamos Promise<T> temos que usar then

    ;(async () => {
        const resAwait = await soma(1,2) // se usamos await o tipo já é resolvido
        // aqui, retorno é number por causa do Awaited
        // Muitas vezes o tipo Awaited vai ser utilizado com ReturnType
        const retorno: Awaited<ReturnType<typeof soma>> = await soma(1,2)
    })

    type promise = Promise<Promise<string>>
    // O Awaited também é recursivo, então se a promise retorna outra promise
    // Ele vai resolver todas elas
    type str = Awaited<promise>

    // COMO FUNCIONA - VERSÃO COMPLEXA

    type awaited<T> = T extends null | undefined 
    ? T // tratamento do caso onde o tipo é null ou undefined
    : T extends object & { then(onfulfilled: infer F, ...args: infer _): any; } // se T é Promise
        ? F extends ((value: infer V, ...args: infer _) => any) // vemos se o `then` é uma função
            ? Awaited<V> // se for, chamamos o tipo novamente (recursão)
            : never // se não, não podemos retornar nada porque não é válido
        : T; // quando resolvemos todos os valores, retornamos somente o tipo
    
    // A versão mais simples desse tipo não é recursiva
    type SimpleAwaited<T> =T extends Promise<infer R> ? R : never
    type nested = Promise<Promise<string>>
    type awaittype = SimpleAwaited<nested> // ainda retorna Promise<string>
    type completeSimple = SimpleAwaited<SimpleAwaited<nested>> // agora sim temos string
}