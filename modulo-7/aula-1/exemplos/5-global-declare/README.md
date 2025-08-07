# Exemplo 5 - Tipos globais sem declare

Podemos exportar tipos globais sem usar `declare`, mas não é uma boa prática

Veja nesse exemplo que o tipo declarado em `global.d.ts` não precisa ser
importado para ser usado em `uso.ts`

> Cuidado ao usar tipos globais! Eles podem fazer você perder o controle do seu
> código
