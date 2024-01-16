/**
 * JSON.parse<T>

Um dos maiores problemas do JavaScript (e do TypeScript) é que a função `JSON.parse` retorna `any` e não permite que a gente faça o a tipagem correta do que colocamos como input!

Desafio:

- Crie uma nova função `JSONParse` que recebe um argumento `input` do tipo `string` e um generic que será o tipo de retorno da função
- Se o generic não for passado, a função deve retornar `unknown`
- Você pode implementar apenas usando `return JSON.parse(input)`
 */

export function JSONParse<T = unknown>(json: string): T {
  return JSON.parse(json) // convenience generics pattern
}
