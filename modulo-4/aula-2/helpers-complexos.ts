{
    /**
     * A segunda coisa que podemos fazer 
     * com tipos recursivos são loops.
     * Dessa forma conseguimos iterar por coleções
     * ou strings e construir tipos mais complexos
     */

    /**
     * Exemplos clássicos de tipos que usam essa abordagem
     * são tipos de manipulação de strings, por exemplo
     * um tipo que deixa todas as letras maiúsculas
     * (isso já existe no TS, vamos só recriar)
     */
    type ToUpper<T extends string, Buffer extends string = ""> = T extends `${infer C}${infer Resto}`
        ? ToUpper<Resto, `${Buffer}${Uppercase<C>}`>
        : Buffer
    type nameUpper = ToUpper<'Lucas'> // LUCAS

    /**
     * O que esse código está fazendo
     * é literalmente um loop equivalente a este aqui
     */
    const str = 'Lucas'
    let buffer = ''
    for (const c of str) {
        buffer += c.toUpperCase()
    }

    console.log(buffer)

    /**
     * Esse é um padrão comum no TypeScript:
     * 1. Recebemos um parâmetro de entrada e um segundo acumulador
     * 2. Iteramos pelo parâmetro de entrada chamando a função novamente
     *    mas, dessa vez, com um elemento a menos na entrada
     * 3. O valor computado é adicionado ao acumulador
     * 4. Retornamos o acumulador
     */
}

{
    /**
     * O primeiro helper complexo que podemos fazer 
     * é o tipo Replace, que procura um valor e substitui
     * por outro em uma string
     */
    type Replace<Str extends string, Busca extends string, Subst extends string> = Busca extends ''
        ? Str
        : Str extends `${infer Antes}${Busca}${infer Depois}`
            ? Replace<`${Antes}${Subst}${Depois}`, Busca, Subst>
            : Str
    type HelloWorld = Replace<'Hello World', 'World', 'Goodbye'> // Hello Goodbye

    /**
     * A ideia principal desse helper é que ele vai procurar por uma palavra
     * buscada no meio da string ou em qualquer outra posição, por isso usamos
     * "Antes" e "Depois", eles representam o resto da string antes e depois
     * da palavra que queremos buscar. Se acharmos essa combinação, vamos chamar
     * a mesma função novamente só que com a palavra de busca alterada pelo valor
     * que queremos substituir e passar os demais parâmetros igualmente
     * Quando não acharmos mais nada, retornamos a string
     */
}

{
    /**
     * Um outro type helper comum é a modificação de casing
     * de snake_case para camelCase, por exemplo. Esse tipo
     * segue a mesma ideia do anterior, porém é um pouco mais
     * direto
     */
    type SnakeToCamelCase<Original extends string> = 
        Original extends `${infer Inicio}_${infer Final}${infer Resto}`
            ? `${Lowercase<Inicio>}${Uppercase<Final>}${SnakeToCamelCase<Resto>}`
            : Lowercase<Original>
    type SnakeConversion = SnakeToCamelCase<'api_key'> // apiKey

    /**
     * Aqui estamos buscando um padrão no modelo <palavra>_<palavra>
    * Porém temos que separar a primeira letra da segunda palavra para 
    * podermos deixá-la capitalizada, por isso usamos o "Resto", isso
    * vai nos dar um matcher <palavra>_<char><resto>, por exemplo, em
    * 'api_key' vamos ter '<api>_<k><ey>', a partir daí retornamos uma
    * string sem o '_' com o início inalterado, a primeira letra capitalizada
    * e chamamos a função novamente para caso tenhamos mais partes, como em
    * 'user_id_column' onde iriamos pegar <user>_<i><d_column>.
    * Na primeira iteração o resultado seria 'userId_column' e depois teremos
    * <userId>_<c><olumn> que será convertido para 'userIdColumn'
    */
}

{
    /**
     * Assim como o tipo para extrair um tipo de um array recursivo
     * Podemos fazer um tipo para extrair uma Promise de uma promise
     */
    type InferPromise<P extends Promise<any>> = P extends Promise<infer U> ? U : never
    type StringPromise = InferPromise<Promise<string>> // string

    /**
     * O problema é que esse tipo não lida com promises recursivas
     * como Promise<Promise<string>>
     */
    type NaoFunciona = InferPromise<Promise<Promise<string>>> // Promise<string> ... está faltando um nível

    /**
     * Poreríamos chamar como InferPromise<InferPromise<Promise<Promise<string>>>>
     * mas até que ponto? Não seria melhor ter um tipo recursivo?
     */
    type Unpromise<P> = P extends Promise<infer R> // Se o tipo é uma promise
        ? Unpromise<R> // chamamos a função de novo sem a promise
        : P extends (...args: any[]) => any // se o retorno da promise é uma função
            ? Unpromise<ReturnType<P>> // temos que chamar novamente para tirar o tipo de retorno
            : P // retornamos o valor final
    type PromiseRecursiva = Unpromise<Promise<Promise<Promise<Promise<string>>>>> // string
}

{
    /**
     * Outro helper interessante é uma forma de puxarmos uma única
     * propriedade de um objeto, não importa onde ela esteja
     * Isso é chamado de Pluck. A versão simples desse método pode 
     * ser feita dessa maneira
     */
    type Pluck<Obj extends Record<string, unknown>, Prop extends keyof Obj> = Obj[Prop]
    type Props = Pluck<{name: 1, age: 2, email: 3}, 'name' | 'age'> // 1 | 2

    /**
     * No entanto, buscar em um objeto qualquer propriedade e traze-la de volta
     * não é trivial. Temos que fazer alguns tipos recursivos bastante complexos
     * Vamos começar com o nosso objetivo
    */

    /**
     * A ideia é ter esse tipo: PluckDeep<{ chave: valor, email: string, obj: { outraChave: outroValor, nested: true } }, 'chave' | 'obj.outraChave'>
     * E ele vai nos trazer um outro objeto que contém somente essas chaves: { chave: valor, obj: { outraChave: outroValor } }
     * Primeiro precisamos de um tipo que vai fazer o parsing de strings do tipo 'chave.valor'
     */
 
    type ParsePath<T extends string> = T extends `${infer Obj}.${infer Chave}` ? [Obj, Chave] : [T]
    /**
     * Poderíamos retornar um objeto ao invés de uma tupla também
     * type ParsePath<T extends string> = T extends `${infer Obj}.${infer Chave}` ? {obj: Obj, chave: Chave} : T
     * type x = ParsePath<'user.id'>['chave']
    */

    type Path = ParsePath<'user.id'> // ['user', 'id']
    type ChaveDoObjeto = Path[0] // 'user'
    type ValorDoObjeto = Path[1] // 'id'

    // Agora vamos trabalhar no nosso tipo
    // Veja que K aqui não pode ser keyof porque estamos trabalhando com tipos aninhados
    type PluckDeep<Obj, K extends string> = Obj extends Record<string, any> // Se o nosso objeto for um objeto qualquer
        ? { 
          // Vamos pegar todas as proriedades dele fazendo o parsing do path e pegando o primeiro elemento
          // Depois vamos fazer uma intersecção com keyof para remover todos os tipos que não são pertencentes a ele
          [Prop in ParsePath<K>[0] & keyof Obj]: Obj[Prop] extends readonly unknown[]
              // Se o elemento que estamos procurando for um array, vamos chamar a função novamente
              // com o objeto interno e todas as suas chaves, e dele a gente vai extrair somente a chave que estamos procurando com chave.valor
            ? PluckDeep<Obj[Prop][number], ParsePath<Extract<K, `${Prop}.${string}`>>[1]>[] 
              // Caso contrário faremos a mesma coisa só que sem um array
            : PluckDeep<Obj[Prop], ParsePath<Extract<K, `${Prop}.${string}`>>[1]>
        } : Obj

    interface Endereco {
        rua: string
        numero: number
    }
    interface Telefone {
        ddd: string
        numero: string
    }
    interface User {
        nome: string
        idade: number
        enderecos: Endereco[]
        telefone: Telefone
    }

    type PartesDeUser = PluckDeep<User, 'nome' | 'enderecos.rua' | 'telefone.numero'>
}
