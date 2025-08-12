/**
 * Uma forma ainda mais segura de se fazer o que
 * fizemos no arquivo 0-import-patching.ts é fazer
 * o que é chamado de local patching, que nada mais é
 * do que um módulo comum exportado
 */

export const JSExtended = {
  Array: {
    chunk<T>(array: T[], size: number): T[][] {
      if (size < 1) throw new Error("size >= 1");
      const out: T[][] = [];
      for (let i = 0; i < array.length; i += size)
        out.push(array.slice(i, i + size));
      return out;
    },
  },
};

// Veja o arquivo uso-local.ts para ver como podemos usar
