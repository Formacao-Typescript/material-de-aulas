{

    /**
     * Tuplas são a versão mais estrita de um array
     * como comentamos anteriormente, uma tupla permite que tenhamos
     * não só a ordem dos elementos definida, mas também a quantidade
     * de elementos estritamente definida, mas outra vantagem da tupla
     * é que podemos ter o nome dos elementos em cada posição
     */
    type Coordenada = [lat: number, long: number]
    // isso é chamado de Named Tuple
    const x: Coordenada = [1, 2]

    // Para relembrar, tuplas não são associáveis a arrays
    const arr: string[] = []
    // @ts-expect-error
    const y: [number, number] = arr

    // Tuplas são muito úteis para podermos definir parâmetros variádicos
    // onde a gente já sabe qual é uma série de elementos
    function foo(...args: [nome: string, idade: number]) { }

    // Quando formos chamar essa função, o TS vai expandir os parâmetros
    // Experimente chamar a função você mesmo, preste atenção nos hints do IDE
    foo('string', 2)

    // Sem uma named tuple a gente não tem os nomes dos parâmetros
    function bar(...args: [string, number]) { }

    // Veja que os nomes agora são args_0 e args_1
    bar()

    // Você pode criar uma tupla fazendo um array ser constante
    // O tipo abaixo é uma readonly [string, number]
    const tuplaFromArray = ['Lucas', 29] as const
}

{
    /**
     * Um uso interessante de tuplas é para armazenar um estado quando estamos
     * realizando operações complexas, por exemplo, você sabia que podemos tipar
     * a função Split do JS de forma exata?
     */
    const nossaFrase = "Hello Formação TS"

    // Quando usamos split, o resultado é uma string[]
    const splitSimples = nossaFrase.split(' ') // string[]

    // Mas podemos criar um tipo Split que leva a palavra e o delimitador
    // e nos retorna uma tupla do que foi dividido
    type Split< // Levamos três parametros
        Frase extends string, // A frase
        Delimitador extends string, // O delimitador
        Estado extends string[] = [] // O estado que vamos usar
    > = Frase extends `${infer Palavra}${Delimitador}${infer resto}` // Se a palavra for algo separado pelo delimitador, vamos extrair a palavra inicial e armazenar o resto
        ? Split<resto, Delimitador, [...Estado, Palavra]> // Chamamos a função de novo com a nova palavra no estado
        : Frase extends '' ? Estado : [...Estado, Frase] // Quando chegarmos no final retornamos o estado

    // Agora podemos criar a nossa função
    function SplitMelhorado<F extends string, D extends string>(frase: F, delim: D): Split<F, D> {
        return frase.split(delim) as Split<F, D> // Temos que usar o 'as' aqui para igualar o tipo
    }

    const split = SplitMelhorado(nossaFrase, ' ')

    /**
     * DESAFIO: Tente fazer um tipo que conta a quantidade de caracteres em uma palavra
     */
}
