/**
 * Desafio final: Conversor Universal
 *
 * Crie um type helper chamado `ConvertCase` que converte uma string `S` de um
 * formato de case para outro. A assinatura do tipo deve ser: ConvertCase<S, I, O>
 *
 * Ele deve receber:
 *  - S: uma string (ex: "user-profile-photo" ou "userProfilePhoto" ou "user_profile_photo")
 *  - I: o formato de entrada — "kebab" | "snake" | "camel"
 *  - O: o formato de saída — "kebab" | "snake" | "camel"
 *
 * Exemplo:
 * type T1 = ConvertCase<"user-profile-photo", "kebab", "camel">; // "userProfilePhoto"
 * type T2 = ConvertCase<"user_profile_photo", "snake", "kebab">; // "user-profile-photo"
 * type T3 = ConvertCase<"userProfilePhoto", "camel", "snake">;   // "user_profile_photo"
 *
 * Regras:
 * - Você pode (e deve!) criar quantos tipos auxiliares forem necessários
 * - É esperado que você reutilize ideias de exercícios anteriores (como Split, Join, Capitalize, etc)
 * - Se necessário, use recursos do TypeScript playground ou da documentação oficial
 */

// Sua implementação começa aqui:

/**
 * SplitCamelCase:
 * Separa uma string camelCase como "userProfilePhoto" em ["user", "profile", "photo"]
 *
 * - S: a string a ser dividida
 * - Acc: acumulador da palavra atual (default: "")
 * - Result: array acumulado de palavras (default: [])
 */
type SplitCamelCase<
  S extends string,
  Acc extends string = "",
  Result extends string[] = [],
> = S extends `${infer First}${infer Rest}` // Divide a string: primeiro caractere em `First`, o resto em `Rest`
  ? First extends Lowercase<First> // Se o caractere for minúsculo, ainda faz parte da palavra atual
    ? SplitCamelCase<Rest, `${Acc}${First}`, Result> // Adiciona `First` ao `Acc` e continua com o resto
    : Acc extends "" // Se o caractere for maiúsculo e não havia nada acumulado (início da string)
      ? SplitCamelCase<Rest, `${First}`, Result> // Começa uma nova palavra com `First` (ex: "U")
      : SplitCamelCase<Rest, `${First}`, [...Result, Acc]>
  : // Finaliza a palavra anterior (`Acc`) e começa nova com `First`, adicionando `Acc` ao resultado
    Acc extends "" // Quando a string acaba: se não sobrou nada em `Acc`,
    ? Result // retorna apenas o resultado acumulado
    : [...Result, Acc]; // senão, adiciona o último `Acc` ao final do resultado

/**
 * SplitBy:
 * Separa uma string por um delimitador fixo.
 * Exemplo: SplitBy<"a-b-c", "-"> → ["a", "b", "c"]
 */
type SplitBy<
  S extends string,
  Sep extends string,
> = S extends `${infer Head}${Sep}${infer Tail}` // Se `S` contiver o separador,
  ? [Head, ...SplitBy<Tail, Sep>] // divide em `Head` e recursivamente divide o `Tail`
  : [S]; // caso contrário (sem separador), retorna o array com `S` inteiro

/**
 * JoinWith: junta um array de strings `S` usando um separador `Sep`.
 * Exemplo: JoinWith<["a", "b", "c"], "-"> → "a-b-c"
 */
type JoinWith<S extends string[], Sep extends string> = S extends [] // Se o array for vazio,
  ? "" // retorna string vazia.
  : S extends [
        // Senão, verifica se o array tem pelo menos um elemento.
        infer Head extends string, // Extrai o primeiro elemento como `Head`
        ...infer Tail extends string[], // e o resto como `Tail`.
      ]
    ? Tail["length"] extends 0 // Se o `Tail` estiver vazio (ou seja, só tinha um elemento no array),
      ? Head // retorna só o `Head`, sem separador.
      : `${Head}${Sep}${JoinWith<Tail, Sep>}` // Senão, concatena: Head + Sep + resultado recursivo com o resto.
    : ""; // Caso o array não corresponda a nenhum padrão acima (fallback de segurança).

// Transforma array em camelCase (ex: ["user", "profile"] -> "userProfile")
type ToCamelCase<Parts extends string[]> = Parts extends [
  infer First extends string,
  ...infer Rest extends string[],
]
  ? `${Lowercase<First>}${JoinWith<CapitalizeAll<Rest>, "">}`
  : "";

// Capitaliza cada item de um array
type CapitalizeAll<T extends string[]> = {
  [K in keyof T]: Capitalize<T[K] & string>;
};

// Lowercase em cada item do array
type LowercaseAll<T extends string[]> = {
  [K in keyof T]: Lowercase<T[K] & string>;
};

// Converte um array de partes para um formato de case
type ConvertArrayCase<
  Parts extends string[],
  To extends "camel" | "snake" | "kebab",
> = To extends "camel"
  ? ToCamelCase<Parts>
  : To extends "snake"
    ? JoinWith<LowercaseAll<Parts>, "_">
    : To extends "kebab"
      ? JoinWith<LowercaseAll<Parts>, "-">
      : never;

// === Tipo final ===
type ConvertCase<
  S extends string,
  I extends "camel" | "snake" | "kebab",
  O extends "camel" | "snake" | "kebab",
> = I extends "camel"
  ? ConvertArrayCase<SplitCamelCase<S>, O>
  : I extends "snake"
    ? ConvertArrayCase<SplitBy<S, "_">, O>
    : I extends "kebab"
      ? ConvertArrayCase<SplitBy<S, "-">, O>
      : never;

// === Testes ===
// Não mude nada daqui para baixo, seu objetivo é fazer todos esses testes passarem
type Expect<Actual, Expected> = [Actual] extends [Expected]
  ? [Expected] extends [Actual]
    ? true
    : never
  : never;

type T1 = Expect<
  ConvertCase<"user-profile-photo", "kebab", "camel">,
  "userProfilePhoto"
>;

type T2 = Expect<
  ConvertCase<"user_profile_photo", "snake", "camel">,
  "userProfilePhoto"
>;

type T3 = Expect<
  ConvertCase<"userProfilePhoto", "camel", "snake">,
  "user_profile_photo"
>;

type T4 = Expect<
  ConvertCase<"userProfilePhoto", "camel", "kebab">,
  "user-profile-photo"
>;

type T5 = Expect<
  ConvertCase<"user-profile-photo", "kebab", "snake">,
  "user_profile_photo"
>;

type T6 = Expect<
  ConvertCase<"user_profile_photo", "snake", "kebab">,
  "user-profile-photo"
>;
