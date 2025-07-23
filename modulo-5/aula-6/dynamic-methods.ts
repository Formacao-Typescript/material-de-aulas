/**
 * Um caso bastante comum no JavaScript é gerar objetos que possuem
 * chaves dinâmicas, nesse caso não temos como saber qual é o tipo
 * do objeto retornado, já que as chaves são geradas em tempo de
 * execução.
 */

/**
 * Para exemplificar, vamos começar com uma ideia:
 * Imagine que nosso sistema trabalha com várias entidades:
 * usuários, produtos, pedidos...
 *
 * E cada entidade pode aparecer em dois formatos:
 * - Input: quando vem de fora, é um número simples (ex: `123`)
 * - Output: quando está dentro do sistema, é uma URN (ex: `urn:user:123`)
 *
 * Para garantir que os dados estejam no formato certo,
 * queremos gerar expressões regulares que validem essas representações.
 *
 * A ideia parece simples: criar um objeto com essas regexes.
 * Mas veja o que acontece:
 */

// Vamos definir os dois tipos aqui para ficar mais fácil
const entities = ["user", "order-item", "product"] as const;
type Entities = "user" | "order-item" | "product";

{
  // Se não usarmos o tipo aqui, não vamos conseguir atribuir depois
  const regexMap: Record<string, RegExp> = {};

  for (const entity of entities) {
    const capitalized = entity
      .replace(/-([a-z])/g, (_, c) => c.toUpperCase())
      .replace(/^([a-z])/i, (c) => c.toUpperCase());

    regexMap[`${capitalized}Input`] = /^[0-9]+$/;
    regexMap[`${capitalized}Output`] = new RegExp(`^urn:${entity}:[0-9]+$`);
  }

  // Funciona em tempo de execução:
  console.log(regexMap.UserInput.test("42")); // true
  console.log(regexMap.OrderItemOutput.test("urn:order-item:123")); // true

  // Mas o TypeScript não sabe que essas chaves existem:
  // Sem intellisense, sem autocomplete, sem validação:
  // O tipo é sempre inferido como um Record<string, RegExp>
}

/**
 * O problema aqui é que estamos usando chaves dinâmicas
 * e o TypeScript só vê isso como `string`, sem nenhuma estrutura.
 *
 * Vamos resolver isso passo a passo, garantindo que:
 * - As chaves sejam inferidas corretamente
 * - Os valores sejam os tipos esperados (`RegExp`)
 * - O uso seja seguro e com intellisense completo
 */

/**
 * Começamos com um tipo auxiliar para transformar strings como 'order-item' em 'OrderItem'.
 * já que o hifen é proibido
 */
{
  type CamelCase<S extends string> = S extends `${infer A}-${infer B}`
    ? `${A}${Capitalize<B>}`
    : S;

  // Exemplos:
  type Test1 = CamelCase<"user">; // 'user'
  type Test2 = CamelCase<"order-item">; // 'orderItem'
}

/**
 * Agora criamos o tipo do objeto final:
 * duas chaves por entidade: `<Entidade>Input` e `<Entidade>Output`
 */

{
  // duplicamos para o nosso próximo passo
  type CamelCase<S extends string> = S extends `${infer A}-${infer B}`
    ? `${A}${Capitalize<B>}`
    : S;

  type RegexMap<T extends Entities> = {
    [K in `${CamelCase<T>}Input` | `${CamelCase<T>}Output`]: RegExp;
  };

  /**
   * Essa função agora gera o par de regexes para uma única entidade,
   * e com a tipagem garantida.
   */
  function createRegexMap<T extends Entities>(entity: T) {
    const capitalized = entity
      .replace(/-([a-z])/g, (_, c) => c.toUpperCase())
      .replace(/^([a-z])/i, (c) => c.toUpperCase());

    const result = {
      [`${capitalized}Input`]: /^[0-9]+$/,
      [`${capitalized}Output`]: new RegExp(`^urn:${entity}:[0-9]+$`),
    };

    return result as RegexMap<T>;
  }

  // Uso com intellisense e segurança de tipos:
  const productRegexes = createRegexMap("product");
  console.log(productRegexes.productInput.test("123")); // true
  console.log(productRegexes.productOutput.test("urn:product:123")); // true
  // Autocomplete funcionando: productRegexes.<...>
}
