import { randomUUID } from "crypto"

{
    /**
     * Assertion functions são funções que servem para garantir
     * um determinado tipo de dado a partir da sua execução
     * A grande vantagem de assertion functions é que elas funcionam
     * em tempo de execução, então você tem a garantia de que as checagens
     * de tipo vão funcionar tanto em compilação quanto em execução
     */

    // Assertion functions não podem retornar nenhum valor e devem dar throw caso falhem
    function assertNumber(n: unknown): asserts n is number {
        //                                ^ Preste atenção na keyword asserts
        //                   ^ sempre unknown
        if (typeof n !== 'number') throw new Error("Tipo não é um número")
    }

    // A função acima usa a asserção para garantir que o tipo passado é número
    const numeroOuString: string | number = 1 as string | number
    //até aqui, numeroOuString pode ser um ou outro
    //então não podemos usar funções como toFixed
    numeroOuString.toFixed(2)

    // depois de fazermos as asserções
    assertNumber(numeroOuString)

    // O tipo de numeroOuString é agora number
    numeroOuString.toFixed(2)
}

{
    /**
     * Um outro uso para assertion functions é criar branded types
     * já que podemos fazer a asserção de que o tipo é um tipo específico
     */

    type Brand<T> = T & { readonly __brand: unique symbol }
    type UUID = Brand<string>

    function assertUUID(id: string): asserts id is UUID {
        const uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!uuidV4Regex.test(id)) throw new TypeError('ID não é um UUID v4')
    }

    // uma função de teste para podermos validar
    function apenasID(id: UUID) {
        return id
    }

    const possivelID = randomUUID() // aqui temos certeza que é um UUID mas o TS não sabe
    apenasID(possivelID) // erro

    assertUUID(possivelID)
    apenasID(possivelID) // ok pois possivelID é agora UUID
}
