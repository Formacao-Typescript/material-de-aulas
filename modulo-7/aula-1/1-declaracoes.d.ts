/**
 * Quando compilamos um arquivo TypeScript para um arquivo JavaScript
 * garantimos que ele vai executar em todos os ambientes, mas ao mesmo tempo
 * perdemos toda a capacidade e inferir os tipos que foram criados nesse arquivo
 *
 * Por exemplo, se tentarmos compilar essa função:
 */
// function sum(...args: number[]) {
//   return args.reduce((n, c) => n + c, 0);
// }

/**
 * Vamos ter a saída sem nenhum tipo, o que é normal quando estamos fazendo nosso
 * próprio projeto, mas o que acontece quando instalamos bibliotecas externas?
 * Como nosso editor sabe que ele precisa auto completar algum tipo de declaração
 * de algo que não escrevemos e não possui nenhum tipo?
 *
 * É ai que entram os Declaration Files.
 *
 * Arquivos de declaração são usados exclusivamente para descrever tipos
 * com declarações sem nenhuma implementação, elas não geram código JavaScript
 * e servem apenas para que possamos passar a informação de tipo para o editor
 * por isso, são colocadas em arquivos especiais com a extensão .d.ts
 *
 * Exemplos clássicos disso estão diretamente no TypeScript em si, se abrirmos
 * a nossa pasta node_modules e formos para typescript/lib vamos ver vários arquivos
 * com a extensão .d.ts que contém TODAS as tipagems de TODOS os objetos que viemos
 * estudando até o momento, por exemplo, esse é o código fonte do tipo dos decorators
 * presente em node_modules/typescript/lib.decorators.d.ts
 */

/**
 * Context provided to a class decorator.
 * @template Class The type of the decorated class associated with this context.
 */
interface ClassDecoratorContext<
  Class extends abstract new (...args: any) => any = abstract new (
    ...args: any
  ) => any,
> {
  /** The kind of element that was decorated. */
  readonly kind: "class";

  /** The name of the decorated class. */
  readonly name: string | undefined;

  /**
   * Adds a callback to be invoked after the class definition has been finalized.
   *
   * @example
   * ```ts
   * function customElement(name: string): ClassDecoratorFunction {
   *   return (target, context) => {
   *     context.addInitializer(function () {
   *       customElements.define(name, this);
   *     });
   *   }
   * }
   *
   * @customElement("my-element")
   * class MyElement {}
   * ```
   */
  addInitializer(initializer: (this: Class) => void): void;

  readonly metadata: DecoratorMetadata;
}

/**
 * em 99% dos casos, nós nunca vamos escrever um arquivo
 * de declaração manualmente, mas eles serão gerados automaticamente
 * pelo TSC através de algumas propriedades dentro de `compilerOptions`
 * no nosso tsconfig.json:
 *
 * - declaration: true ou false para ativar ou desativar a geração
 * - declarationDir: pasta para colocar todos os arquivos .d.ts
 * - declarationMap: gera ou source map para que possamos mapear errors
 *   no código compilado para linhas válidas nas declarações
 * - emitDeclarationOnly: se true, vai somente emitir .d.ts e não compilar
 * - isolatedDeclarations: gera mais contexto para que cada arquivo .d.ts seja isolado
 *
 * Cada arquivo .d.ts gera um código local de módulo desde que coloquemos
 * a keyword `export`
 */
export interface MinhaInterface {
  apiUrl: string;
} // essa interface é válida para todos os arquivos locais

interface MinhaInterface {
  apiUrl: string;
} // sem o exports, agora podemos usar globalmente

/**
 * Outra forma de gerarmos declarações é declará-las no escopo global
 */
declare global {
  interface MinhaInterfaceGlobal {
    propriedade: number;
  }
} // Veja o arquivo declaracoes.ts para ver que podemos usar a interface sem importar

/**
 * Essencialmente, isso é tudo que temos para arquivos de declarações
 * não existem muitas coisas que podemos fazer com eles diretamente
 * mas eles podem ser bem úteis quando estamos querendo tipar coisas
 * globalmente. Vá para a pasta de exemplos para ver o que podemos fazer
 */
