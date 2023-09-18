{
    const tipo: any = 'oi'
    const tipo2 = tipo as string
    const tipo3 = <string>tipo

    const literal = 'literal' as 'literal'
    const literal2 = 'literal' as const

    let tamanho: number = (tipo as string).length
}

{
    const naoSei: unknown = { a: 1, b: 'outro valor' }
    // naoSei.a
    ;(naoSei as {a: number, b: string}).b

    interface AlgumaCoisa {
        a: number
        b: string
    }

    ;(naoSei as AlgumaCoisa).a
}

{
    const a: string = 123 as string
    const b: string = 123 as unknown as string
}

{
    interface Pessoa {}
    let pessoa: Pessoa = {}

    pessoa.nome = 'lucas'

    interface PessoaDefinida {
        nome: string
    }

    let pessoa2: PessoaDefinida = { }
    let pessoa3: PessoaDefinida = { } as PessoaDefinida
}

{
    interface Respostas {
        nome: string
        email: string
        telefone?: string
        endereco?: string
    }

    interface Usuario {
        nome: string
        email: string
        telefone?: string
        latitude?: number
        longitude?: number
    }

    const resposta: Respostas = { 
        nome: 'Joao', 
        email: 'Joao@email.com', 
        telefone: '123123123' 
    }

    const usuario: Usuario = {
        nome: resposta.nome,
        email: resposta.email,
    }

    if (resposta.telefone) {
        // validação
        usuario.telefone = resposta.telefone
    }

    if (resposta.endereco) {
        const { lat, long } = apiGeo(resposta.endereco)
        usuario.latitude = lat
        usuario.longitude = long
    }
}

{
    function isNumber (value: unknown) {
        return typeof value === 'number'
    }

    function isString (value: unknown): value is string {
        return typeof value === 'string'
    }

    const valor: unknown = 123
    if (isString(valor)) {
        console.log(valor.length)
    }

    const outroValor: unknown = 123
    if (isNumber(outroValor)) {
        outroValor.toFixed(0)
    }
}

{
    function assertNumber (value: unknown): asserts value is number {
        if (typeof value !== 'number') {
            throw new Error('Precisa ser um número')
        }
    }

    const valor: unknown = 123
    assertNumber(valor)
    valor.toFixed()
}