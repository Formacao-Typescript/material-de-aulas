# Exemplo 1: Módulo simples

Nesse exemplo vamos demonstrar a capacidade do TypeScript de entender tipos que
estão além do seu arquivo JavaScript original.

Para isso vamos:

1. Criar um arquivo chamado `modulo.js` que representa um módulo que foi
   compilado
2. Um arquivo `modulo.d.ts` que representa o arquivo de declaração gerado quando
   rodamos `tsc` com `declaration: true` no nosso `tsconfig.json`
3. Um terceiro arquivo `uso.ts` que vai representar um arquivo que estamos
   codando que importa o módulo JavaScript

Vamos ver que podemos ter a tipagem correta do tipo no arquivo JavaScript mesmo
importando a partir de um arquivo TyhpeScript
