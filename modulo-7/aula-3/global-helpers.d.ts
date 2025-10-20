/**
 * Um dos principais usos de arquivos declarativos feitos manualmente
 * é para adicionar tipos e helpers globais que o TypeScript não possui
 * nativamente, como os que viemos criando ao longo do curso.
 *
 * Isso é o que alguns pacotes famosos como o typetype e o type-fest
 * fazem por baixo dos panos. Eles criam tipos dessa forma, porém não
 * globais, mas sim específicos para o pacote. Outros pacotes como o
 * ts-reset fazem isso para sobrescrever tipos nativos do TypeScript
 */

export { };

// A ideia é a mesma, declaramos o escopo global
// e sobrescrevemos os tipos que queremos
declare global {
  // Como estamos criando tipos nogotivos, não precisamos
  // criar um método já existente
  type ArrayElement<T extends readonly unknown[]> =
    T extends readonly (infer U)[] ? U : never;

  type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
  };

  /**
   * Podemos criar também um "namespace" onde possamos
   * colocar os nossos tipos para deixar mais organizado
   *
   * Obs: estamos criando um namespace porque não podemos
   * criar interfaces somente com tipos, idealmente namespaces estão
   * depreciados e só devem ser usados em casos como esse para
   * evitar conflitos com outros pacotes que podem exportar os mesmos
   * tipos
   */
  namespace MeusTypes {
    // Vamos acessar como Meutypes.Nullable<T>
    type Nullable<T> = T | null;
  }
}

/**
 * CUIDADO!!!
 *
 * Criar tipos globais não é algo que deve ser feito constantemente.
 *
 * Apenas crie tipos globais caso eles sejam suficientemente genéricos
 * e tenha certeza de que eles não irão conflitar com outros tipos
 */
