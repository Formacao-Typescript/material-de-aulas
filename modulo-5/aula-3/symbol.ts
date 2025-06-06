
/**
 * Symbols são um tipo primitivo do JavaScript introduzido no ES6
 * e suportado pelo TypeScript. Eles servem para criar identificadores
 * únicos que nunca colidem, mesmo que tenham a mesma descrição.
 *
 * Em TypeScript, também existe o tipo `unique symbol`, que é
 * um refinamento de `symbol` com garantias de identidade em tempo
 * de compilação.
 */

// Você pode explorar mais sobre Symbols no meu artigo (antigo, porém ainda válido):
// https://lsantos.dev/fts-symbols

{
    /**
     * Um símbolo comum pode ser criado assim:
     */
    const sym1 = Symbol('id');
    const sym2 = Symbol('id');

    /**
     * Mesmo que os dois símbolos acima tenham a mesma descrição ("id"),
     * eles são completamente diferentes. O TypeScript e o JS os consideram
     * únicos:
     */
    //@ts-expect-error Symbols são sempre únicos, mesmo com a mesma descrição
    const iguais = sym1 === sym2; // false

    /**
     * Podemos usar símbolos como chaves de propriedades de objetos.
     * Isso é útil para evitar colisões com outras chaves.
     */
    const chave = Symbol('segredo');
    const obj = {
        [chave]: 'valor escondido',
        normal: 'valor comum',
    };

    console.log(obj[chave]); // 'valor escondido'
    console.log(Object.keys(obj)); // ['normal'] — o símbolo não aparece aqui

    /**
     * Note que propriedades com símbolos não são acessadas com Object.keys()
     * ou loops como for...in. Elas são "invisíveis" por padrão.
     */
}

{
    /**
     * Agora entra o tipo `unique symbol`, que é uma feature do TypeScript
     * e permite criar constantes que têm um tipo literal exclusivo.
     */
    const IDENTIFICADOR: unique symbol = Symbol('identificador');

    /**
     * Esse `IDENTIFICADOR` agora tem um tipo que só ele possui.
     * Isso é muito útil para criar propriedades privadas simbólicas
     * que não podem ser replicadas, nem mesmo por acidente.
     */

    interface Pessoa {
        nome: string;
        [IDENTIFICADOR]: number;
    }

    const pessoa: Pessoa = {
        nome: 'Lucas',
        [IDENTIFICADOR]: 42
    };

    /**
     * O símbolo também pode ser usado como "marca" ou "tag" interna
     * em um tipo. E como é `unique`, o compilador impede qualquer
     * tentativa de imitá-lo.
     */
}

{
    /**
     * Atenção: `unique symbol` só pode ser usado em constantes (`const`),
     * e não em variáveis mutáveis (`let` ou `var`). Isso porque o TypeScript
     * precisa garantir que o valor não vai mudar.
     *
     * Isso aqui dá erro:
     * let outro: unique symbol = Symbol(); // ERRO!
     */

    /**
     * Uma aplicação avançada de unique symbols é criar tipos
     * de marcação (tagging) para identificar tipos em sistemas complexos,
     * como bibliotecas de validação ou serialização.
     */

    const BRAND: unique symbol = Symbol('brand');

    type UserId = number & { [BRAND]: 'UserId' };

    function createUserId(id: number): UserId {
        return id as UserId;
    }

    const userId = createUserId(123);

    // Não posso passar um number qualquer onde espera-se um UserId
    function buscarUsuarioPorId(id: UserId) {
        console.log('Buscando', id);
    }

    buscarUsuarioPorId(userId);     // OK
    //@ts-expect-error Não podemos associar um numero comum porque ele não é um branded type
    buscarUsuarioPorId(123);        // ERRO! Não é um UserId
}

