/**
 * 1. ReplaceAll
 * Substitui todas as ocorrências de `From` por `To` dentro de `Str`.
 */
type ReplaceAll<
  Str extends string,
  From extends string,
  To extends string,
> = From extends ""
  ? Str // evita loop infinito se From for vazio
  : Str extends `${infer Head}${From}${infer Tail}`
    ? `${Head}${To}${ReplaceAll<Tail, From, To>}`
    : Str;

type Ex1 = ReplaceAll<"a-b-c-d", "-", "_">; // "a_b_c_d"

/**
 * 2. Split
 * Divide uma string `Str` em partes com base em um delimitador `Delimiter`.
 */
type Split<Str extends string, Delimiter extends string> = Delimiter extends ""
  ? string[] // delimitador vazio é ambíguo
  : Str extends `${infer Head}${Delimiter}${infer Tail}`
    ? [Head, ...Split<Tail, Delimiter>]
    : [Str];

type Ex2 = Split<"a-b-c", "-">; // ["a", "b", "c"]

/**
 * 3. Join
 * Junta um array de strings com um separador `Separator`.
 */
type Join<Parts extends string[], Separator extends string> = Parts extends []
  ? ""
  : Parts extends [infer Only extends string]
    ? Only
    : Parts extends [infer Head extends string, ...infer Tail extends string[]]
      ? `${Head}${Separator}${Join<Tail, Separator>}`
      : string;

type Ex3 = Join<["a", "b", "c"], "-">; // "a-b-c"

/**
 * 4. CamelCaseArray
 * Transforma um array como ['user', 'profile', 'photo'] em "userProfilePhoto"
 */
type CamelCaseArray<T extends string[], Acc extends string = ""> = T extends [
  infer First extends string,
  ...infer Rest extends string[],
]
  ? CamelCaseArray<Rest, `${Acc}${Capitalize<First>}`>
  : Uncapitalize<Acc>;

type Ex4 = CamelCaseArray<["user", "profile", "photo"]>; // "userProfilePhoto"

/**
 * 5. StartsWith
 * Verifica se uma string começa com um prefixo específico.
 */
type StartsWith<
  Str extends string,
  Prefix extends string,
> = Str extends `${Prefix}${string}` ? true : false;

type Ex5a = StartsWith<"user-id", "user">; // true
type Ex5b = StartsWith<"order-id", "user">; // false
