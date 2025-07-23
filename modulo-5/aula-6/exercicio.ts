/**
 * 🧠 Desafio: Mapa de regexes tipado para múltiplas entidades
 *
 * Dado o que a gente já fez até agora,
 * implemente a função `getRegexMaps` que recebe uma lista de entidades
 * e retorna um objeto com todas as regexes no seguinte formato:
 *
 * {
 *   userInput: /^[0-9]+$/,
 *   userOutput: /^urn:user:[0-9]+$/,
 *   orderItemInput: /^[0-9]+$/,
 *   orderItemOutput: /^urn:order-item:[0-9]+$/,
 *   ...
 * }
 *
 * ✅ O TypeScript deve conseguir inferir corretamente as chaves do objeto
 * com autocomplete e validação.
 *
 * ❗ Você mesmo deve criar os tipos auxiliares como `CamelCase` e `RegexMap`,
 * reaproveitando os conceitos mostrados na aula.
 */

const entities = ["user", "order-item", "product"] as const;
type Entities = (typeof entities)[number];

// Implemente os tipos auxiliares aqui:
// type CamelCase<...> = ...
// type RegexMap<...> = ...
type CamelCase<S extends string> = S extends `${infer A}-${infer B}`
  ? `${A}${Capitalize<B>}`
  : S;

type RegexMap<T extends string> = {
  [K in `${CamelCase<T>}Input` | `${CamelCase<T>}Output`]: RegExp;
};

function getRegexMaps<T extends readonly Entities[]>(
  list: T,
): RegexMap<T[number]> {
  const result = {} as RegexMap<T[number]>;

  for (const entity of list) {
    const capitalized = entity
      .replace(/-([a-z])/g, (_, c) => c.toUpperCase())
      .replace(/^([a-z])/i, (c) => c.toLowerCase());

    const inputKey = `${capitalized}Input` as keyof RegexMap<T[number]>;
    const outputKey = `${capitalized}Output` as keyof RegexMap<T[number]>;

    result[inputKey] = /^[0-9]+$/;
    result[outputKey] = new RegExp(`^urn:${entity}:[0-9]+$`);
  }

  return result;
}
