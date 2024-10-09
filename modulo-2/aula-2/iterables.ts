{
    /**
    * Do outro lado de generators temos os Iterables e os Iterators
    * Um Iterable é um objeto que podemos iterar sobre, como um array
    * Um Iterator é um objeto que sabe como acessar os itens de um Iterable
    *
    * Na definição mais técnica, um Iterable é qualquer objeto que implementa
    * um Symbol.iterator, que é uma função que retorna um Iterator
    * Um Iterator é um objeto que implementa um next, que é uma função que retorna
    * um objeto com value e done
    */

    /**
    * Quando criamos o generator de fibonacci, ele é um IterableIterator
    * ou seja, ele tanto possui o símbolo de iteração quanto a função next
    * então ele é um dos objetos que pode ser considerado ambas as coisas
    */

    // Vamos construir um Iterable
    let iterable = {
        // Uma função
        [Symbol.iterator]() {
            let i = 0;
            // Que retorna um iterator
            return {
                // que é um objeto com uma função next
                next() {
                    // Que retorna um objeto com value e done
                    return {
                        value: i++,
                        done: i > 5
                    }
                }
            }
        }
    }

    // Agora podemos iterar sobre o iterable
    for (let i of iterable) {
        console.log(i)
    }

    // Ele vai retornar 0, 1, 2, 3, 4
    // Mas podemos fazer o mesmo com o spread
    console.log(...iterable) // que vai printar tudo na mesma linha

    // Veja que o tipo que o TypeScript associou ao iterable é o objeto em si
    // Mas podemos tipar manualmente
    const iterable2: Iterable<number> = iterable
}

{
    // Vamos construir um Generator
    // Agora nosso tipo é Generator<number, void, unknown>
    let generator = {
        // Uma função com *
        *[Symbol.iterator]() {
            let i = 0;
            while (i < 5) {
                // Que retorna um yield
                yield i++;
            }
        }
    }

    // Agora podemos iterar sobre o iterable
    for (let i of generator) {
        console.log(i)
    }

    // Ele vai retornar 0, 1, 2, 3, 4
    // Mas podemos fazer o mesmo com o spread
    console.log(...generator) // que vai printar tudo na mesma linha
}
