import fs from 'node:fs';
import { join } from 'node:path';

{
    /**
    * Generators são uma forma de criar iteradores de forma mais simples.
    * A ideia é que essas funções sejam usadas para gerar outros valores
    * e que possam ser pausadas e continuadas. Dando a quem chamou
    * um controle bem fino do fluxo
    */

    // Por serem lazy, ou seja, só executam quando chamados
    // eles permitem gerar valores infinitos
    // generators são definidos com um asterisco após function ou antes do nome da função
    function* fibonacci() {
        let a = 0;
        let b = 1;

        // A chanve de um generator é usarmos um loop infinito
        while (true) {
            // com a keyword yield, que para a execução do generator
            yield a;
            // isso é chamado de destructuring assignment
            // e permite que a gente altere o valor de duas variáveis ao mesmo tempo
            [a, b] = [b, a + b];
        }
    }
}

{
    // podemos anotar o retorno manualmente também
    function* fibonacci(): Generator<number> {
        let a = 0;
        let b = 1;

        while (true) {
            yield a;
            [a, b] = [b, a + b];
        }
    }

    // desde o typescript 3.6
    // O tipo de um generator é Generator<Yield, Done, Valor>
    const fibGenerator = fibonacci();
    // A cada vez que chamamos next, o generator continua de onde o yield parou
    fibGenerator.next() // { value: 0, done: false }

    // A cada retorno, o generator vai retornar um objeto com value e done
    // value é o valor retornado pelo yield
    // done é um booleano que indica se o generator terminou
    // neste caso, o generator nunca termina, então done é sempre false
    fibGenerator.next() // { value: 1, done: false }
    fibGenerator.next() // { value: 1, done: false }
    fibGenerator.next() // { value: 2, done: false }
}

{
    /**
    * Um generator pode também retornar um valor além do yield
    * esse é o chamado de tipo de retorno, que é o valor que o generator retorna
    * quando done é true
    */
    function* generatorWithReturn() {
        yield 1;
        return 'oi';
    }

    // Esse generator é um Generator<number, string, unknown>
    // Ou seja, ele retorna number, e quando termina, retorna string
    const gen = generatorWithReturn();
    // Aqui temos um number
    const current = gen.next() // { value: 1, done: false }

    // O retorno é dado sempre que o generator está finalizado
    if (current.done) {
        // O valor aqui é uma string
        console.log(current.value)
    }

}

{
    /**
    * Além do outro valor do retorno, podemos também passar um valor para o generator
    * com o método next, esse é o terceiro parâmetro do tipo Generator
    */
    function* count(): Generator<number, string, boolean> {
        let i = 0;
        while (true) {
            // Se passarmos um boolean para o next, ele vai parar
            // Se for false, vamos continuar retornando números
            if (yield i++) break
        }
        // depois de completo vamos retornar uma string
        return "completo"
    }

    // O generator acima funciona como um contador
    const iterator = count();
    // Aqui temos números
    let current = iterator.next(); // { value: 0, done: false }

    // Temos que usar um while aqui
    // pois se não o TS não sabe quando o iterator vai acabar
    while (!current.done) {
        // Aqui ainda temos números, mas essa é a última execução
        current = iterator.next(true); // { value: 1, done: false }
    }

    // aqui, value é uma string
    current.value.toUpperCase(); // "COMPLETO"
}

{
    /**
    * se repertirmos o mesmo código só que com um if
    */
    function* count(): Generator<number, string, boolean> {
        let i = 0;
        while (true) {
            if (yield i++) break
        }
        return "completo"
    }

    const iterator = count();
    let current = iterator.next(); // { value: 0, done: false }

    if (!current.done) {
        current = iterator.next(true); // { value: 1, done: false }
    }

    // aqui, temos um erro
    // pois o TS não sabe que o iterator terminou
    current.value.toUpperCase();
}

{
    /**
     * Passar valores para o generator é útil em alguns casos, por exemplo, uma soma constante
     */
    function* somaConstante(): Generator<number, void, number> {
        let value = 0
        while (true) {
            const increment = yield value
            value += increment
        }
    }

    const soma = somaConstante()
    // Aqui temos 0
    soma.next() // { value: 0, done: false }
    // Aqui temos 10
    soma.next(10) // { value: 10, done: false }
    // Aqui temos 20
    soma.next(10) // { value: 20, done: false }
}

{
    /**
     * Generators podem ser recursivos se você retornar o valor como outro generator
     * por exemplo, quando estamos fazendo a leitura de um diretório recursivamente
     */
    function* readDir(dir: string): Generator<string> {
        const files = fs.readdirSync(dir, { withFileTypes: true })
        for (const file of files) {
            if (file.isDirectory()) {
                yield* readDir(join(dir, file.name))
                continue
            }
            yield join(dir, file.name)
        }
    }

    // podemos usar como um for of
    for (const file of readDir('.')) {
        console.log(file)
    }
}
