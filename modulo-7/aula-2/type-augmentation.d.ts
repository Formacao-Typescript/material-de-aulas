/**
 * Como estamos vendo, o TypeScript utiliza arquivos declarativos
 * para poder definir quais são os tipos que serão mostrados na
 * hora do desenvolvimento. Esses arquivos exportam interfaces
 * tipos, ou outros construtores, o que significa que você pode estendê-los
 * o ato de estender um tipo nativo para incluir ou modificar
 * sua assinatura é chamado de TYPE AUGMENTATION
 *
 * Para isso, vamos ter que adicionar uma propriedade no nosso
 * tsconfig.json indicando que queremos pegar outros tipos
 * de uma pasta específica, essa propriedade é chamada de
 * TypeRoots e indica para o TypeeScript que vamos utilizar
 * arquivos de configuração que vem desta lista de pastas
 *
 * Por isso que colocamos esse arquivo dentro da pasta Types
 */

/**
 * Vamos para um exemplo clássico, o método JSON.parse
 * que, no TypeScript tem a seguinte assinatura:
 * parse (text: string, reviver?: (this: any, key: string, value: any) => any): any;
 * Veja que o retorno é any, e isso vem sendo um problema há muito tempo
 * idealmente deveríamos ter um retorno como unknown para podermos
 * tipar esse retorno de forma mais segura.
 *
 * Para isso, podemos criar um arquivo de declaração com qualquer nome
 * vamos usar esse como modelo
 */

// Primeiro temos que declarar esse arquivo como um módulo
// isso evita que o TS execute esse arquivo como um script
// global e previne conflitos
export {};

// Vamos declarar o módulo global, dizendo que vamos sobrescrever
// as funções dentro dele
declare global {
  // Dizemos que vamos sobrescrever a interface JSON
  interface JSON {
    // e o método parse
    parse(
      text: string,
      // é importante dizer que os parâmetros precisam ser IDENTICOS
      reviver?: (this: any, key: string, value: any) => any,
    ): unknown;
  }
}

/**
 * Agora vá no arquivo type-augmentation.ts
 * e veja como podemos definir uma variável
 * que será unknown
 */

// Podemos continuar redeclarando os overloads
declare global {
  // Dizemos que vamos sobrescrever a interface JSON
  interface JSON {
    // e o método parse
    parse<T = unknown>(
      text: string,
      // é importante dizer que os parâmetros precisam ser IDENTICOS
      reviver?: (this: any, key: string, value: any) => any,
    ): T;
  }
}
