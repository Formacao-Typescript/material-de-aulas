// Temos obrigatoriamente que importar o nosso pacote
// para poder definir a implementação
// mas, uma vez importado, ele vai estar válido para todos os demais
// Por isso, geralmente importamos no arquivo index
import "./0-import-patching.js";

const arr = [1, 2, 3, 4, 5, 6];

console.log(JSExtended.Array.chunk(arr, 2));
