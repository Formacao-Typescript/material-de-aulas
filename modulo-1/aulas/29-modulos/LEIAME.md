# Módulos

Nessa pasta você vai ter os principais sistemas de resolução de módulos do JavaScript. Cada uma das pastas tem exatamente o mesmo arquivo `index.ts` que importa e exporta diversos objetos. O objetivo é que você possa testar cada um dos sistemas de módulos e ver como eles funcionam.

Para poder gerar os módulos transpilados, execute `npx tsc -p ./tsconfig.json` **na pasta do arquivo `index.ts`** que você quer transpilar. Isso vai gerar um arquivo `index.js` na pasta de cada um dos sistemas de módulos.

> Lembrando que, para poder usar esse comando você precisa instalar a definição externa de tipos do Node no TypeScript com `npm install --save-dev @types/node`. Rode esse comando na raiz do projeto (a pasta `modulo-1`)

## ES Modules (ESM)

O ES Modules é o sistema de módulos que foi criado para o JavaScript. Ele é o sistema de módulos que você usa quando faz `import` de um módulo no Node.js ou no navegador.

Atualmente, o ESM é o formato mais simples e o mais recomendado para se trabalhar, não só porque ele é mais novo, mas também porque agora ele já é suportado nativamente pela maioria dos runtimes, incluindo o Node.js e o navegador. Esse vai ser o sistema que vamos usar sempre.

```js
import fs from 'fs';
export default {
  fs,
};
```

## CommonJS

O CommonJS é o sistema de módulos que foi primeiro adotado pelo Node.js e se tornou o padrão de facto para o JavaScript. Ele é o sistema de módulos que você usa quando faz `require` de um módulo no Node.js.

```js
const fs = require('fs');

module.exports = {
  fs,
};
```

## AMD (Asynchronous Module Definition)

O AMD é um sistema de módulos assíncrono que foi criado para o navegador. Ele é o sistema de módulos que você usa quando faz `require` de um módulo no RequireJS, um antigo sistema de resolução de módulos para o navegador.

```js
define(['fs'], function (fs) {
  return {
    fs,
  };
});
```

## UMD (Universal Module Definition)

O UMD é um sistema de módulos que tenta unificar o CommonJS e o AMD. Ele é o sistema de módulos que você usa quando faz `require` de um módulo no Webpack.

```js
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['exports', 'fs'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS
    module.exports = factory(require('fs'));
  } else {
    // Browser
    factory((root.myModule = {}), root.fs)
  }
})(typeof self !== 'undefined' ? self : this, function (fs) {
  exports.fs = fs;
});
```

