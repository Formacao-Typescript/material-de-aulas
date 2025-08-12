/**
 * Uma forma mais segura de se tipar algo globalmente
 * são os chamados import patches. Que nada mais são do que
 * um módulo AUTO CONTIDO que contém tanto a declaração dos tipos
 * quanto a implementação da função.
 *
 * E aí temos uma novidade, nós podemos escrever qualquer coisa
 * que escreveríamos em um .d.ts em um aquivo .ts normal, a diferença
 * é que, se fizermos em um arquivo .ts, provavelmente vamos ter que
 * informar o TS que o tipo existe, usando a declaração "var"
 */

// 1- Parte da declaração
export {};

// Declaramos o módulo global
declare global {
  /**
   * Aqui não podemos declarar um namespace porque
   * namespaces não podem ser inicializados, além disso
   * namespaces são má prática e só devem ser utilizados
   * quando estamos exportando APENAS TIPOS e não funções
   * como fizemos nos helpers globais, já que não podemos
   * aninhar tipos dentro de interfaces
   */
  interface JSExtended {
    Array: {
      chunk<T>(arr: T[], size: number): T[][];
    };
  }

  // Aqui estamos dizendo para o TypeScript que esse namespace
  // SEMPRE vai existir. Se removermos essa linha, vamos começar a ter
  // erros na nossa implementação
  var JSExtended: JSExtended;
}

// 2- Parte da implementação
globalThis.JSExtended ??= {
  Array: {},
} as any;

globalThis.JSExtended.Array.chunk = function <T>(
  array: T[],
  size: number,
): T[][] {
  if (size < 1) throw new TypeError("Size must be >= 1");
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

/**
 * Dessa forma vamos SEMPRE ter que importar o nosso pacote para que
 * ele possa fazer efeito globalmente, evitando os tipos mágicos
 *
 * Além disso, fazer o namespace do módulo garante que não vamos ter
 * nenhum tipo de conflito com essa ou nenhuma outra versão da linguagem
 */
