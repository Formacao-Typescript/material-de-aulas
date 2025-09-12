/**
 * O par dos lookup types são os mapped types.
 * Mapped types são tipos que nos permitem criar novos tipos
 * através da iteração sobre as chaves de um tipo existente.
 *
 * Mapped types são definitos pelas keywords `keyof` e `in`.
 * E, diferente dos lookup types, eles não são usados para
 * acessar propriedades de um tipo, mas sim para criar
 * novos tipos baseados em um tipo existente e, geralmente,
 * só são utilizados em conjunto com os lookup types.
 */

{
    /**
     * Um exemplo de mapped type é o `Partial<T>`, que
* transforma todas as propriedades de um tipo
     * em opcionais.
     */
    type Partial<T> = {
        [K in keyof T]?: T[K];
    }

    /**
     * Veja o uso do "K in keyof T", que significa
     * "Para cada chave K em T" e depoi o "?" e "T[K]"
     * Essencialmente, o que estamos dizendo é:
     * "Para cada chave K em T, crie uma nova propriedade
     * K que é opcional e tem o mesmo tipo de T[K]".
     *
     * Aqui estamos usando tanto lookup types no T[K] quanto
     * mapped types no [K in keyof T].
     */
}

{
    /**
     * Porém, mapped types tem um poder interessante,
     * eles podem modificar não só o tipo das propriedades,
     * mas também podem remover ou adicionar novas propriedades
     * a um tipo já existente.
     *
     * como exemplo, vamos fazer um mapped type que remove todas as propriedades
     * que podem ser `undefined` de um tipo e retorna apenas as chaves que são obrigatórias
     */
    type NonUndefined<T> = {
        [Chave in keyof T]: undefined extends T[Chave] ? never : Chave;
    }[keyof T]

    type Teste = NonUndefined<{
        name?: string
        age: number
        isAdmin?: boolean
    }>

    /**
     * Mas podemos ir além e também retornar o objeto inteiro fazendo um tipo condicional
     * dentro do nosso mapped type, por exemplo, se ao invés de retornar somente as chaves
     * eu quiser remover todas essas chaves do objeto inteiro e retornar um novo objeto
     * sem elas?
     */
    type RemoveUndefined<T> = {
        [Chave in keyof T as undefined extends T[Chave] ? never : Chave]: T[Chave];
    }

    type TesteObjeto = RemoveUndefined<{
        name?: string
        age: number
        isAdmin?: boolean
    }>

    /**
     * Neste exemplo estamos usando o `as` para renomear a chave
     * se a condição for verdadeira, ou seja, se a propriedade
     * for opcional e puder ser `undefined`, ela será renomeada
     * para `never`, o que significa que ela não será incluída
     * no novo tipo.
     */

    /**
     * Se você notar, o mapped type acima é um pouco verboso
     * e estamos repetindo o mesmo tipo de lógica que usamos
     * no tipo NonUndefined, ou seja, estamos verificando
     * novamente se a propriedade é opcional e removendo-a.
     *
     * Podemos simplificar o nosso tipo usando o outro mapped type
     * que criamos anteriormente, que já retorna todas as chaves
     * que são obrigatórias
     */
    type RemoveUndefinedSimplified<T> = {
        [Chave in NonUndefined<T>]: T[Chave];
    }

    type TesteObjetoSimplificado = RemoveUndefined<{
        name?: string
        age: number
        isAdmin?: boolean
    }>

    /**
     * Podemos simplificar ainda mais se utilizarmos o tipo
     * Pick, que já é nativo do typeScript e nos permite
     * puxar um tipo exato de um objeto, ou seja,
     * podemos puxar somente as chaves que são obrigatórias
     * retornadas pelo mepped type NonUndefined
     */
    type RemoveUndefinedPick<T> = Pick<T, NonUndefined<T>>

    type TesteObjetoPick = RemoveUndefinedPick<{
        name?: string
        age: number
        isAdmin?: boolean
    }>
}
