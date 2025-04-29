/**
 * A maioria dos tipos que vimos até agora são estáticos, ou seja
 * eles não tem nenhum tipo de inteligência, vão sempre responder
 * com a mesma tipagem para qualquer que seja a lógica que colocamos
 * dentro deles.
 *
 * Mas existem casos onde precisamos fazer uma checagem de código
 * um if. E isso é possível em TypeScript através de ternários
 * que já até usamos em outros projetos.
 */

{
    // Todo conditional type começa com um tipo genérico
    type Caixa<T> = T extends string ? "A caixa tem strings" : "A caixa não tem strings"

    /**
     * Através dos ternários, podemos definir nossos caminhos possíveis
     * neste caso, estamos somente retornando uma string dependendo do
     * parâmetro enviado.
     */
    type CaixaString = Caixa<string> // A caixa tem strings
    type CaixaNumber = Caixa<number> // A caixa não tem strings

}

{
    /**
     * A principal diferença entre os tipos condicionais
     * e um if simples em qualquer linguagem de programação
     * é que usamos "extends" ao invés de "if" para verificar
     * se um tipo é um subconjunto de outro (lembre-se que tipos são conjuntos)
     * se o tipo A estende o tipo B isso significa que a condição
     * é satisfeita, caso contrário não.
     *
     * Um exemplo onde conditional typing pode ser muito útil é
     * na criação de overloads, que saem disto:
     */
    interface AnimalID {
        id: number
    }

    interface AnimalNome {
        name: string
    }

    function criarAnimal(id: number): AnimalID
    function criarAnimal(nome: string): AnimalNome
    function criarAnimal(nomeOuId: string | number): AnimalID | AnimalNome {
        throw "implementação não importa"
    }

    /**
     * A função acima tem dois tipos diferentes
     * de retorno e eles dependem de um tipo de entrada
     * mas isso é bastante verboso, então podemos escrever assim
     */
    {
        function criarAnimal<T extends number | string>(nomeOuId: T): T extends string ? AnimalNome : AnimalID {
            throw "implementação não importa"
        }

        const n = criarAnimal(1) // AnimalID
        const s = criarAnimal('pato') // AnimalNome

        /**
         * O que está acontecendo aqui?
         *
         * O parâmetro T é restringido para ou string ou number
         * então não podemos passar nada além disso
         * então estamos dizendo que o parâmetro de entrada da função é
         * do tipo T, ou seja, T vai assumir o valor de `typeof <nosso valor>`
         * e o resultado dessa função depende do valor de T
         */
    }
}

{
    /**
     * tipos condicionais também funcionam com propriedades de objetos
     * por exemplo, se um tipo pode receber um parâmetro, mas ele só vai
     * retornar um valor se esse parâmetro tiver uma propriedade de um derterminado tipo
     *
     * Vamos testar com o tipo Pessoa. Toda pessoa tem que ter uma propriedade CPF
     */
    interface Pessoa {
        cpf: string
    }

    interface Animal {
        tag: number
    }

    // Como podemos criar um tipo que aceita apenas objetos do tipo pessoa?
    type isPessoa<T> = T extends { cpf: string } ? T : never
    const Lucas: Pessoa = { cpf: '123' }
    const Belinha: Animal = { tag: 456 }

    type NaoPessoa = isPessoa<typeof Belinha> // never
    type UmaPessoa = isPessoa<typeof Lucas> // Pessoa

    /**
     * Isso só é possível porque o TypeScript tem a tipagem
     * estrutural, e não nominal, como falamos no treinamento essencial
     */
}

{
    /**
     * Podemos conectar vários condicionais para criar uma
     * sequencia que seria o equivalente a if/else if ou 
     * até mesmo um switch/case
     */
    type Resposta<T> =
        T extends string ? { message: T }
        : T extends number ? { status: T }
        : T extends boolean ? { success: T }
        : T extends undefined ? {}
        : T extends (args: any) => any ? { result: ReturnType<T> }
        : unknown;

    /**
     * OBS: Eu prefiro deixar os ternários alinhados por ":"
     * na mesma linha, assim é mais fácil saber onde está a
     * condição de entrada e saída, mas você pode fazer como achar melhor
    */

    type T1 = Resposta<'Sucesso!'> // {message: 'Sucesso!'}
    type T2 = Resposta<() => void> // {result: void}
    type T3 = Resposta<{}> // unknown
    type T4 = Resposta<undefined> // {}
    type T5 = Resposta<boolean> // {success: true | false }
    type T6 = Resposta<401> // {status: 401}

    /**
     * Tipos condicionais são DISTRIBUTIVOS, ou seja, 
     * se o parâmetro de entrada (T) for uma union de vários tipos
     * para cada item da union vamos aplicar o mesmo condicional e 
     * o resultado será a união de todas as condições que foram satisfeitas
     */
    type Distributiva = Resposta<string | number>

    /**
     * O resultado do tipo acima é {message: string} | {status: number}
     * porque tanto o condicional de string quanto o condicional de number
     * foi satisfeito. Imagine que para cada item da union vamos rodar o mesmo
     * if e retornar todos os resultados.
     */
}
