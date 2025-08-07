# Exemplo 4 - Tipos globais com declare

Quando colocamos `declare` na frente de um módulo ou tipo, estamos dizendo que
esse tipo é global, podemos fazer o mesmo com `declare global {}` onde definimos
o tipo `global` que já existe, e estendemos ele usando declaration merging.

Veja nesse exemplo que o tipo declarado em `global.d.ts` não precisa ser
importado para ser usado em `uso.ts`

> Cuidado ao usar tipos globais! Eles podem fazer você perder o controle do seu
> código
