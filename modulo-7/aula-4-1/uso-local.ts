/**
 * Esta é a melhor forma de se utilizar um módulo desse tipo
 * porque não criamos efeitos colaterais como mudança de protótipos
 * mas infelizmente vamos ter que importar o arquivo em todos os lugares
 */
import { JSExtended } from "./1-local-patching";

console.log(JSExtended.Array.chunk([1, 2, 3, 4, 5, 6], 2));
