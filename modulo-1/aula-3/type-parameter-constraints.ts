{
    // Type constraints são usados para limitar os tipos que podem ser passados como argumentos para um tipo genérico.
    // Isso é feito usando a palavra-chave extends e o tipo que você deseja que seja o limite.
    // Por exemplo, essa função só pode aceitar parâmetros do tipo string ou menores

    function maiuscula<T extends string>(param: T): Uppercase<T> {
        return param.toUpperCase() as Uppercase<T>;
    }

    const resultado = maiuscula('teste');
    //     ^ "TESTE"

    // Isso não seria possível se o nosso tipo não tivesse a restrição, pois ele poderia ser qualquer coisa:
    function maiusculaSemRestricao<T>(param: T): Uppercase<T> {
        //                                                 ^ Error: T does not satisfy constraint 'string'
        // @ts-expect-error
        return param.toUpperCase() as Uppercase<T>;
        //           ^ Error: Property 'toUpperCase' does not exist on type 'T'.
    }
}

{
    // Constraints são extremamente úteis quando queremos usar métodos que são específicos de algum tipo de dado.
    // Por exemplo, quando temos uma função que recebe algum tipo de Array e queremos fazer uma operação sobre ele
    // Mas esse tipo de operação só é possível se o tipo do array for um número.

    function somaArray<T extends number>(...param: T[]): number {
        return param.reduce((acc, value) => acc + value, 0);
    }
}

{
    // Um outro uso comum de constraints é quando queremos que um tipo genérico seja um objeto.
    // Por exemplo, se quisermos que um tipo genérico seja um objeto com uma propriedade específica.

    function getName<T extends { name: string }>(obj: T): string {
        return obj.name;
    }

    const obj = { name: 'teste', age: 20 };

    // Aqui podemos usar o método getName, pois o objeto obj tem a propriedade name
    // mesmo tendo outras propriedades
    // Isto porque o TypeScript não tem tipagem NOMINAL
    const resultado = getName(obj);
}

{
    // Constraints também podem ser usados com interfaces
    // Neste caso, a interface é usada para definir o tipo de dados que o tipo genérico deve ter
    interface IName {
        name: string;
    }
    function getName<T extends IName>(obj: T): string {
        return obj.name;
    }
    const obj = { name: 'teste', age: 20 };
    // Aqui podemos usar o método getName, pois o objeto obj tem a propriedade name
    // mesmo tendo outras propriedades
    // Isto porque o TypeScript não tem tipagem NOMINAL
    const resultado = getName(obj);
}

{
    // Também podemos usar mapped types como keyof para poder restringir um tipo
    // a ser um subconjunto de chaves de outro parâmetro genérico

    function getProperty<T extends Record<string, any>, K extends keyof T>(obj: T, key: K): T[K] {
        return obj[key];
    }
}
