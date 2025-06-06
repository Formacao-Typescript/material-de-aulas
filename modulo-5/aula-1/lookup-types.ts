/**
 * Até agora construimos alguns tipos que são baseados em outros tipos
 * por exemplo, temos tipos condicionais que são baseados nos valores passados
 * também temos tipos genéricos e todos os demais helper types que estudamos como
 * ReturnType, Extract, Omit, que são formas de construirmos tipos novos com tipos
 * que já existem
 *
 * Porém temos outras ferramentas que nos permitem construir tipos ainda mais poderosos
 * como, por exemplo, um objeto completamente novo a partir de todas as chaves de um array
 * esses tipo são chamados de LOOKUP TYPES
 *
 * Já chegamos a ver alguns desses tipos nas aulas anteriores, como quando fizemos o tipo RequiredDeep
 * mas agora vamos entrar mais a fundo nesses tipos e ver como podemos aprendê-los e utilizá-los
 */

{
    /**
     * Um lookup type é um tipo que nos permite criar um novo tipo
     * através da observação de um conjunto de chaves ou propriedades
     * de outro tipo
     */
    interface User {
        name: string
        age: number
        email: string
        isAdmin: boolean
    }

    /**
     * No caso mais simples de uso, lookup types são apenas
     * formas de buscar um tipo sem precisar criar um novo
     * ou repetir o tipo que já foi definido.
     *
     * Se quisermos pegar um tipo específico do objeto User,
     * por exemplo, o tipo da propriedade 'name', podemos usar
     * a notação de lookup type.
     *
     * Isso evita que, se a propriedade email mudar de tipo,
     * tenhamos que mudar o tipo em vários lugares
     */
    type UserEmail = User['email'] // string

    /**
     * Mas se quisermos pegar todas as chaves de um objeto
     * e transformá-las em um novo tipo, podemos usar o
     * operador keyof
     */
    type TodasAsChaves = User[keyof User] // string | number | boolean

    /**
     * Veja que o tipo acima é a união de todos os tipos
     * que estão nas propriedades do objeto User de uma única vez
     * 
     * Nós usamos User[keyof User], o que pode parecer estranho e repetitivo
     * mas a realidade o que estamos fazendo é dizer: "Deste objeto, quero que você itere por todas as chaves"
     * o que o "keyof" faz é dizer para o compilador que queremos iterar por todas as chaves do objeto em questão
     */

    /**
     * Lookup types também são muito úteis quando estamos criando funções 
     * que só podem aceitar um subconjunto de propriedades de um objeto
     * por exemplo, a função "props" (bem comum no Ramda) busca uma única propriedade
     * de um objeto e retorna o valor dessa propriedade, mas para que ela seja type safe
     * precisamos garantir que a propriedade passada seja uma chave válida do objeto
     */
    function props<Objeto, Prop extends keyof Objeto>(obj: Objeto, key: Prop): Objeto[Prop] {
        return obj[key]
    }

    // Tente chamar essa função abaixo e veja o que acontece com o intellisense
    const Lucas: User = {
        name: 'Lucas',
        age: 30,
        email: 'hello@lsantos.dev',
        isAdmin: false
    }

    //@ts-expect-error Substitua a string pela sua propriedade
    const nome = props(Lucas, 'sua prop aqui')
}
