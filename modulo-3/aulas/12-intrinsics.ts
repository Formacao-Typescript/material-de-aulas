{
    /**
     * Tipos intrínsecos são aqueles que não dependem apenas de outros tipos
     * ou seja, não dá pra gente simplesmente fazer eles com os tipos que temos
     * eles exigem um processamento do compilador, geralmente usando
     * funções do JS nativo
     */
    type cores = 'Azul' | 'Amarelo' | 'Vermelho'
    // O mesmo que fazer um toUpperCase(), deixa tudo em maiúsculo
    type upper = Uppercase<cores>
    // Tudo minúsculo
    type lower = Lowercase<cores>
    // Primeira letra maiúscula
    type capital = Capitalize<cores>
    // Remove as primeiras letras como maiúsculas
    type uncapital = Uncapitalize<cores>

    // Vamos exemplificar com uma configuração
    interface config {
        PORT: number
        DB_HOST: string
    }

    // Se quisermos transformar tudo em lowercase, vamos precisar mapear
    type lowerconfig = {
        [K in Lowercase<keyof config>]: config[Uppercase<K>]
    }

    // Podemos criar um tipo generico
    type ObjectToLower<T> = {
        [K in keyof T as Lowercase<string & K>]: T[K]
    }
    type configlower = ObjectToLower<config>

    type ObjectToCapital<T> = {
        [K in keyof T as Capitalize<Lowercase<string & K>>]: T[K]
    }
    type configCapital = ObjectToCapital<config>
}