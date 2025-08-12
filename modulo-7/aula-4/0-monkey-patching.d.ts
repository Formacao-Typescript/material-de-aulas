/**
 * Um outro uso de arquivos declarativos é para criarmos
 * Os chamados "monkey patches", que é o nome dado a quando
 * substituiímos ou estendemos o comportamento de uma função
 * nativa do sistema em runtime, por exemplo, vamos adicionar
 * um novo método nativo ao Array.
 */

export {};

declare global {
  // Primeiro de tudo vamos fazer a declaração do tipo
  interface Array<T> {
    /**
     * Divide o array em blocos de tamanho fixo.
     * @param size Tamanho do bloco.
     */
    chunk(size: number): T[][];
  }
}

/**
 * Acima, estamos fazendo a declaração do nosso tipo
 * neste caso, estamos declarando que o Array vai ter
 * um novo método chamado `chunk`. Isso será global e
 * passará a valer assim que inicializarmos nosso programa
 * mas não temos uma implementação ainda. Para isso vamos
 * editar o arquivo array-chunk.ts
 */

/**
 * ATENÇÃO!!!!
 *
 * Monkey patching global NÃO É RECOMENDADO e é uma má prática
 * essa aula tem como objetivo mostrar as possibilidades dos arquivos
 * declarativos, porém aplicar modificações globais às classes nativas
 * da linguagem não é uma boa ideia devido a como a própria linguagem
 * pode evoluir no futuro e quebrar o seu código.
 *
 * Sempre prefira patches locais se você quiser sobrescrever algo específico
 * ou então use namespaces específicos para poder criar classes extras
 */
