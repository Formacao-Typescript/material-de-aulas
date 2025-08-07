// Aqui temos uma função sem nenhuma tipagem
// Veja o arquivo `modulo.d.ts`
export function sum(...num) {
  return num.reduce((a, n) => a + n, 0);
}
