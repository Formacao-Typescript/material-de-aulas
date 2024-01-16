/**
 * Fetch<T>

O módulo `fetch` do Node (e dos browsers) tem a mesma falha do `JSON.parse`, ele não permite que eu diga o que estou esperando de retorno!

- Crie uma função chamada `BetterFetch` que recebe um parâmetro que é uma URL e execute um GET nessa URL, retornando o tipo que quisermos que ele retorne
- Dica: Use um generic para especificar o tipo de retorno
- Outra dica: A função fetch é assíncrona! E ela tem vários passos, bora implementar os métodos de retorno dela também? (como `ok`, `json()`, `text()`)
- Você não precisa implementar outros métodos além do GET e pode usar `return fetch(url)` na implementação, mas, se você quiser, implemente o objeto de opções do fetch que você pode ver aqui: https://developer.mozilla.org/en-US/docs/Web/API/fetch#options
  - Dica: Talvez você não precise usar as opções da mozilla, o TypeScript já tem um tipo para isso!
 */

// Implementação simples
export async function BetterFetch<T = unknown>(url: string): Promise<T> {
  const response = await fetch(url)
  if (!response.ok) throw new Error('Request failed')
  return (await response.json()) as T
}

// Contendo os métodos ok, json e text
export async function BetterFetch2<T = unknown>(url: string) {
  const response = await fetch(url)
  return {
    ok: response.ok,
    json: async () => (await response.json()) as T,
    text: async () => await response.text()
  }
}

// Contendo os métodos ok, json e text, com tipagem do objeto options
export async function BetterFetch3<T = unknown>(url: string, options: RequestInit = {}) {
  const response = await fetch(url, options)
  return {
    ok: response.ok,
    json: async () => (await response.json()) as T,
    text: async () => await response.text()
  }
}
