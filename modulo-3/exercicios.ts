{
    /**
     * Crie um tipo que retorne "sim" se o parâmetro for uma string e "não" caso contrário
     */
    type isString<T> = T extends string ? "sim" : "não"
    type Sim = isString<string>
    type Nao = isString<number>
}

{
    /**
     * Crie um tipo que verifica se um tipo é um array e retorna true ou false
     */
    type IsArray<T> = T extends Array<any> ? true : false;

    // Exemplos de uso:
    type A = IsArray<string[]>; // true
    type B = IsArray<number>;   // false
}

{
    /**
     * Crie um tipo que remove o `null` de um union
     * (você não pode usar Exclude ou similares)
     */
    type RemoveNull<T> = T extends null ? never : T;

    // Exemplos de uso:
    type A = RemoveNull<string | null>; // string
    type B = RemoveNull<number>;        // number
    type C = RemoveNull<null>;          // never
}

{
    /**
     * Crie um tipo que extrai o tipo de retorno de uma função
     * (você não pode usar ReturnType)
     */
    type MeuReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

    // Exemplos de uso:
    type A = MeuReturnType<() => string>; // string
    type B = MeuReturnType<(id: number) => boolean>; // boolean

    //Essa é a implementação do helper "ReturnType<T>"
}

{
    /**
     * Crie um tipo que retorne todos parâmetros de uma função
     */
    type MeusParametros<T> = T extends (...args: infer P) => any ? P : never;

    // Exemplos de uso:
    type C = MeusParametros<(x: string, y: number) => void>; // [string, number]

    type D = MeusParametros<() => void>; // []

    // Essa é a implementação do tipo Parameters<T>
}

{
    /**
     * Crie um tipo que retorne somente o primeiro parâmetro de uma função
     */
    type PrimeiroParametro<T> = T extends (arg1: infer P, ...args: any[]) => any ? P : never;

    // Exemplo:
    type E = PrimeiroParametro<(nome: string, idade: number) => void>; // string
}

{
    /**
     * Crie um tipo que retorne o tipo de retorno de uma função
     * mas se for uma Promise, retorne o tipo dentro dessa promise
     * (Sem usar ReturnType)
     */
    type UnwrappedReturn<T> = T extends (...args: any[]) => infer Retorno ? Retorno extends Promise<infer Interno> ? Interno : Retorno : never
    type PromiseFn = UnwrappedReturn<() => Promise<string>> // string
    type NormalFn = UnwrappedReturn<() => number> // number

}

{
    /**
     * DESAFIO
     * Crie um tipo que verifica se T é uma união (union type)
     * Deve retornar true se T for união (ex: string | number),
     * e false se for tipo único (ex: string).
     */
    type IsUnion<T, U = T> =
        T extends any
        ? [U] extends [T]
        ? false
        : true
        : never;

    // Exemplos de uso:
    type A = IsUnion<string | number>; // true
    type B = IsUnion<string>;           // false
    type C = IsUnion<never>;            // false

    /**
     * O que está acontecendo?
     *
     * 1. Colocamos o valor original de T no tipo U, que é auxiliar (U = T para o usuário não precisar especificar).
     * 2. O TS distribui o `T extends any` para cada membro da união, já que `T extends any` é SEMPRE true
     *    Um exemplo real: T = "a" | 1
     *
     *    Primeiro passo: T = "a"
     *      - Comparação: [U] extends ["a"]? [U] é exatamente o valor de T então ["a"|1]
     *      - ["a" | 1] extends ["a"] ? Não
     *        -> Então true (union)
     *
     *    Segundo passo: T = 1
     *      - Comparação: [U] extends [1]?
     *      - ["a" | 1] extends [1] ? Não
     *        -> Então true (é union)
     * 
     *    Já que tivemos pelo menos um "true" nas comparações, o tipo final é true
     *
     *    Agora se T fosse só "a" (sem union):
     *
     *    T = "a"
     *      - [U] extends ["a"]?
     *      - [U] = ["a"]
     *      - ["a"] extends ["a"] ? Sim
     *        -> Resultado = false (não é union)
     *
     * Por que os colchetes []?
     * Porque os colchetes impedem que o TS faça a distributiva
     * e pega exatamente o valor que foi mandado para ele.
     *
     * Se a gente não tivesse colocado os colchetes, cada um dos tipo
     * U e T seriam distribuídos e ai cada membro de U seria comparado
     * com cada membro de T
     *
     */
}
