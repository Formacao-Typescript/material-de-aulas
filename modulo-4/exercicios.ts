{
    /**
     * Crie um tipo chamado Required<T> que recebe um objeto
     * e transforma todas as propriedades desse objeto em obrigatórias
    */
    type Required<T extends Record<string, any>> = {
        [P in keyof T]-?: T[P]
    }

    interface Parcial {
        name?: string
        age?: number
    }

    type Obrigatorio = Required<Parcial>
}

{
    /**
     * Faça o mesmo do exercício anterior, mas agora com um tipo
     * RequiredDeep<T> que faz com que todas as propriedades de um objeto
     * sejam obrigatórias, incluindo as que estão em objetos aninhados
     */
    type RequiredDeep<T> = {
        // Temos que garantir que estamos buscando propriedades que são undefined
        // Uma outra forma de fazer essa linha é usar o tipo built-in Required: [P in keyof T]: Required<RequiredDeep<T[P]>>
        [P in keyof T]-?: T[P] extends object | undefined ? RequiredDeep<T[P]> : T[P]
    }

    interface Parcial {
        name?: string
        age?: number
        next?: Parcial
    }

    interface ParcialNested {
        topLevel?: string
        parcial?: Parcial
    }

    type ObrigatorioNested = RequiredDeep<ParcialNested>
    type ExemploConcreto = RequiredDeep<{ name?: string, next?: { name?: string, next?: { name?: string } } }>
    const x: ExemploConcreto = {
        name: '',
        // @ts-expect-error
        next: { // erro
            name: ''
        }
    }
}

{
    /**
     * Crie um tipo chamado Optional<T> que recebe um objeto
     * e transforma todas as propriedades desse objeto em opcionais
    */
    type Optional<T extends Record<string, any>> = {
        [P in keyof T]?: T[P]
    }

    interface Obrigatorio {
        name: string
        age: number
    }

    type Parcial = Optional<Obrigatorio>
}

{
    /**
     * Faça o mesmo do exercício anterior, mas agora com um tipo
     * DeepOptional<T> que faz com que todas as propriedades de um objeto
     * sejam obrigatórias, incluindo as que estão em objetos aninhados
     */
    type DeepOptional<T> = {
        // Uma outra forma de fazer essa linha é usar o tipo built-in Partial: [P in keyof T]: Partial<DeepOptional<T[P]>>
        [P in keyof T]?: T[P] extends object ? DeepOptional<T[P]> : T[P]
    }

    interface Obrigatorio {
        name: string
        age: number
        next: Obrigatorio
    }

    interface ObrigatorioNested {
        topLevel: string
        parcial: Obrigatorio
    }

    type ParcialNested = DeepOptional<ObrigatorioNested>
    type ExemploConcreto = DeepOptional<{ name: string, next: { name: string, next: { name: string } } }>
    const x: ExemploConcreto = {
        name: '',
        next: {
        } // ok!
    }
}
