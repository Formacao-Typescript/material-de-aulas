{
    /**
     * Tipos recursivos são uma das ferramentas mais importantes do TS
     * a ideia principal é a mesma de funções recursivas: 
     * iterar sobre algo que pode ter um tamanho arbitrário
     * A diferença é que, em linguagens de alto nível, temos instruções como loops (for, while)
     * mas no TypeScript a recursão é a forma que temos de criar loops e iterações
     */

    /**
     * Vamos quebrar essa aula em duas partes
     * a primeira parte (esta) vai se referir somente a recursão como uma forma
     * de aplicar funcionalidades a uma estrutura que é profundamente aninhada
     * por exemplo, um tipo que define um JSON
     */

    type JSON = string | number | boolean | null | JSON[] | { [chave: string]: JSON }

    /**
     * O tipo acima define completamente um JSON válido
     * Um JSON é qualquer string, numero, boolean, null
     * solto, ou então um objeto que tem uma chave string
     * e o valor pode ser qualquer um desses tipos, incluindo
     * outro objeto com a mesma assinatura, ou então um array
     * de tudo isso
     */
    const umJSON: JSON = {
        name: 'Lucas', // string
        age: 29, // number
        reference: null, // null
        active: true, // boolean
        address: { // objeto
            street: "Foo",
            city: "Bar",
            region: { // objeto aninhado
                name: "Baz",
                areas: [
                    "lorem",
                    "ipsum"
                ]
            }
        },
        scopes: [ // array de objetos
            { name: 'scope-1', type: 'read' },
            { name: 'scope-2', type: 'write' }
        ]
    }

    /**
     * A segunda parte vai ser falada na próxima aula
     * que será a utilização de loops
     */

    /**
     * Uma outra forma de termos tipos recursivos
     * é utilizando interfaces, por exemplo
     * uma lista ligada, onde cada nó tem uma propriedade
     * que é o próximo nó
     */
    interface ListNode {
        value: unknown,
        next?: ListNode
    }

    const node2: ListNode = { value: 2 }
    const node1: ListNode = { value: 1, next: node2 }

    // Se executarmos vamos ver que a lista segue as referências
    console.log(node1)

    /**
     * Um bom exemplo de estruturas de tipos recursivos
     * é o próprio DOM do HTML. Se formos converter em
     * uma estrutura mais simples, cada nó do DOM é 
     * simplesmente uma estrutura que pode ter um valor
     * e muitos outros nós filhos que são também partes do DOM
     */
    interface DOMNode {
        value: unknown,
        children?: DOMNode[]
    }

    const DOMTree: DOMNode[] = [{
        value: 'a',
        children: [
            {
                value: 'span',
                children: [{ value: 'b' }]
            }
        ]
    }]
}

