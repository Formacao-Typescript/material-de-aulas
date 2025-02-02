{
    /**
     * Decorators permitem que façamos o que é chamado de meta programação
     * ou seja, eles modificam o comportamento de uma classe e seus membros
     * em tempo de execução.
     *
     * Mas para isso precisamos primeiro configurar o nosso tsconfig para
     * aceitar decorators. Fazemos isso ativando a flag `experimentalDecorators`
     * e `emitDecoratorMetadata` no tsconfig.json
     * Além disso precisamos que o target seja pelo menos ES5
     */

    /**
     * Decorators são parte de uma proposta do TC39 para o JavaScript
     * O TypeScript implementou essa proposta na versão 5.0
     */

    /**
     * Um decorator é uma função que pode ser aplicada
     * antes da instanciação/execução de alguma classe, método ou parâmetro
     * eles são bem comuns em outras linguagens como Java e já estão
     * fazendo sua aparição em frameworks como Nest
     */

    // Esse é um exemplo de decorator simples sem tipagem
    function debug(metodo: any, contexto: any): void {
        console.log({ metodo, contexto })
    }

    // @ts-expect-error Vamos ter um erro de compilação local
    @debug // Isto é um decorator
    class MinhaClasse { }

    /**
     * IMPORTANTE! Para podermos executar decorators nós TEMOS
     * que compilar o TS com o TSC, eles não funcionam com o TSX
     * e nem com o node
     */
}

{
    /**
     * Decorators são simplesmente funções que retornam
     * ou uma função ou nada. Eles precisam seguir essa estrutura
     */
    /**
     * Esse é um decorator que printa dois logs da execução de um método
     * @param metodo é o método que está sendo decorado
     * @param contexto é o contexto da configuração, ele contém várias propriedades como o tipo, nome, acessor, etc
     * @return o novo método que vai ser executado no lugar
     */

    /**
    * FIX: Vamos ter um problema aqui porque não temos como criar um decorator genérico
    * retornando o novo método ou então o resultado da função
    * porque o TypeScript exige que o retorno seja o mesmo tipo do objeto decorado
    * uma opção é criar uma factory de decorators e passar o tipo do decorator
    * outra é não retornar nada e sempre substituir o .value do objeto pela função
    * decorada (olhar no GPT as conversas) dessa forma podemos fazer metodo.value = função decorada
    * e não retornar absolutamente nada do decorator, o que não cria erros de tipos no retorno
    */

    // NOTE: Decorator de exemplo que não funcionou
    // function debug<T>(metodo: T, contexto: any): void {
    //     console.log({ metodo, contexto })
    // switch (contexto.kind) {
    //     case 'method':
    //     case 'setter':
    //     case 'getter': {
    //         return function (...args: any[]) {
    //             console.log(`Executando o método ${contexto.name.toString()} com os argumentos ${args.toString()}`)
    //             // Chamamos o método
    //             const retorno = (metodo as Function).call(this, ...args)
    //             console.log(`Executou ${contexto.name.toString()} com retorno: ${retorno}`)
    //             // retornamos o que o método retorna
    //             return retorno
    //         }
    //     }
    //     case 'field': {
    //         return function (valorInicial: any) {
    //             console.log(`inicializando a variável ${contexto.name.toString()} com o valor ${valorInicial}`)
    //             return valorInicial
    //         }
    //
    //     }
    //     case 'class': {
    //         return class extends (metodo as any) {
    //             constructor(...args: any[]) {
    //                 super(...args)
    //                 console.log(`Construindo uma nova instancia de ${contexto.name?.toString()} com argumentos ${args.toString()}`)
    //             }
    //         }
    //     }
    // }
    // }

    @debug
    class Foo {
        @debug private _nome: string

        constructor(nome: string) {
            this._nome = nome
        }

        @debug
        dizerOi() {
            console.log(`${this.nome} diz oi`)
        }

        @debug
        get nome() {
            return this._nome
        }
    }

    const f = new Foo('lala')
    f.nome
    f.dizerOi()
}
