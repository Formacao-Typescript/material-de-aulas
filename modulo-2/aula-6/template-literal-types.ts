import { randomUUID } from "crypto"

{
    /**
     * Template literal types são uma forma de usarmos valores de outros tipos para poder
     * criar um tipo literal, por exemplo
     */
    type World = "world"
    type Hello = `hello ${World}` // O tipo computado é 'hello world'
}

{
    /**
     * Um outro uso de template literals é que eles vão expandir strings
     * que são definidas como enums, por exemplo, se quisermos transformar
     * esses enums em unions de seus valores podemos fazer assim:
     */
    enum Tamanho {
        P = 'pequeno',
        M = 'medio',
        G = 'grande'
    }
    enum Cor {
        PRETO = 'preto',
        BRANCO = 'branco',
        VERMELHO = 'vermelho'
    }

    type Tamanhos = `${Tamanho}` // pequeno | medio | grande
    type Cores = `${Cor}` // preto | branco | vermelho
}

{
    /**
     * Template literal types são extremamente úteis quando temos que criar
     * tipos dinâmicos, que dependem dos valores finais de outros tipos e
     * precisam ser literais, por exemplo:
     * Se tivermos uma sequencia de enums que podem ser combinados
     */

    // Usando os mesmos enums de antes, vamos criar combinações deles
    enum Tamanho {
        P = 'pequeno',
        M = 'medio',
        G = 'grande'
    }
    enum Cor {
        PRETO = 'preto',
        BRANCO = 'branco',
        VERMELHO = 'vermelho'
    }

    type Tamanhos = `${Tamanho}` // pequeno | medio | grande
    type Cores = `${Cor}` // preto | branco | vermelho

    /**
     * O tipo resultante é uma permutação de todos os valores
     * possíveis de cores e tamanhos, isso é excelente pra quando
     * precisamos tipar valores para um select, por exemplo
     */
    type Combinacoes = `${Tamanhos}-${Cores}`

    /**
     * E isso também é válido para mais de dois
     */
    enum Tipos {
        FOSCO = 'fosco',
        BRILHANTE = 'brilhante'
    }
    type Permutacao = `${Tamanhos}-${Cores}-${Tipos}`

    /**
     * Isso é especialmente útil quando a gente tem que gerar
     * tipos para propriedades do CSS
     */
    type Propriedades = 'margin' | 'border' | 'padding'
    type Lados = 'bottom' | 'top' | 'left' | 'right'
    type CSS = `${Propriedades}-${Lados}`
}

{
    /**
     * Um uso especialmente importante com template literals
     * é que podemos separar e mapear propriedades com nomes diferentes
     * por exemplo, temos essa classe
     */
    interface PessoaDados {
        nome: string
        email: string
        idade: number
        dataNascimento: Date
    }

    // Essa função é apenas para que possamos retornar o tipo correto para as entries
    function betterEntries<T extends Record<string, any>>(o: T): [keyof T, T[keyof T]][] {
        return Object.entries(o)
    }

    // Função de ajuda para podermos capitalizar o nome da função
    function capitalize<T extends string>(s: T): Capitalize<T> {
        return `${s.charAt(0).toUpperCase()}${s.slice(1).toLowerCase()}` as Capitalize<T>
    }

    class Pessoa {
        constructor(dados: PessoaDados) {
            // Pegamos todas as entradas como [chave, valor][]
            const entries = betterEntries(dados)
            for (const [key, value] of entries) {
                // para cada uma vamos definir uma nova propriedade
                // dinamicamente
                Object.defineProperty(this, `get${capitalize(key)}`, {
                    // Ela vai ser enumerável então podemos listar
                    enumerable: true,
                    // Vai ser um getter
                    get: () => value,
                })
            }
        }
    }

    // Um tipo de ajuda para podermos retornar uma propriedade
    // com um nome diferente da original
    type AddGetters<T> = {
        // Para cada chave de T vamos criar uma outra chave
        // com outro nome usando template strings
        [K in keyof T as `get${Capitalize<string & K>}`]: T[K]
    }
    interface Pessoa extends AddGetters<PessoaDados> { }

    const p = new Pessoa({ dataNascimento: new Date(), email: 'adsjasd', idade: 2398, nome: 'aksldjlkasdj' })
    console.log(p.getNome)
}

{
    /**
     * Um outro caso de uso para template literals é a criação de tipos
     * que podem manipular strings, por exemplo, um tipo que faz split
     * de uma string usando um delimitador, como já vimos antes em outras aulas
     */
    type Split<S extends string, D extends string> = string extends S ? string[]
        // Se tiver vazio é um array vazio 
        : S extends '' ? []
        // Se não, vemos se o padrão é string<delimitador>string e separamos
        // usando destructuring e chamamos o tipo novamente
        : S extends `${infer Primeiro}${D}${infer Resto}` ? [Primeiro, ...Split<Resto, D>]
        : [S]
    const x: Split<'hello;world', ';'> = ['hello', 'world']
}

{
    /**
     * Um outro caso é para validação de strings que tem um padrão
     * Por exemplo, uuids
     */
    type UUID = `${string}-${string}-${string}-${string}-${string}`
    const id: UUID = randomUUID() as UUID
}
