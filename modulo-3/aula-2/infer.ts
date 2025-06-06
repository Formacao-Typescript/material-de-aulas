{
    /**
     * Infer é um conceito fundamental de tipagem condicional
     * porque ele SÓ pode ser usado dentro da cláusula "extends"
     * de um tipo condicional.
     *
     * O infer é uma forma de capturar tipos implícitos. Até agora
     * estamos trabalhando sempre com tipos definidos, por exemplo
     * uma string, ou um number, mas e se quisermos saber o tipo
     * interno de um array sem precisar ter que criar uma validação
     * para cada um deles? Queremos que a nossa tipagem "pegue" o tipo
     * de outro tipo automaticamente, isso é chamado de "inferência"
     */
    // Este tipo vai extrair o tipo de dentro de um array
    // Ele pode ser construido assim também: SeuArray extends (infer TipoInterno)[] ? TipoInterno : never
    type ArrayType<SeuArray> = SeuArray extends Array<infer TipoInterno> ? TipoInterno : never
    type ArrayString = ArrayType<[string]> // string
    type Tuplas = ArrayType<[1, 2, 3, 4]> // 1|2|3|4
    const arr = ['nome', 'sobrenome']
    type DeOutroTipo = ArrayType<typeof arr> // string

    // O mesmo vale para propriedades de objetos
    /**
     * Aqui vamos ter um tipo que verifica se a propriedade "id"
     * existe no objeto, se sim, pega o tipo dela e retorna
     * se não retorna never
     */
    type ID<T> = T extends { id: infer U } ? U : never

    interface User {
        id: string
        nome: string
    }
    interface Maquina {
        tag: number
    }

    type TipoUser = ID<User> // string
    type TipoMaquina = ID<Maquina> // never
}

{
    /**
     * Outro exemplo de uso de infer é
     * remover wrapper types, por exemplo, uma Promise<T>
     * assim como fizemos com o array, mas com um retorno padrão
     * ao invés de never
     */
    type Unpromise<T> = T extends Promise<infer U> ? U : T

    type Resultado = Unpromise<Promise<string>>//string
    type Resultado2 = Unpromise<number> // number
}
