# Exemplo 3 - Default exports

As vezes vamos ter interfaces que exportam seus tipos por padrão, de forma que
podemos importar usando `import tipo from 'pacote'` ao invés de importar de
forma nomeada como `import { metodo } from 'pacote'`. Para esses casos vamos ter
algo diferente.

Novamente, aqui temos três arquivos:

1. `default.js` Que será o módulo compilado
2. `default.d.ts` que é o módulo de tipos
3. `uso.ts` que é o uso
