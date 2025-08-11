/**
 * LEIA O ARQUIVO types/type-augmentation.d.ts PRIMEIRO
 *
 * Não precisamos importar o arquivo de declaração
 * porque já dissemos ao TS que queremos que eles venham
 * da pasta Types
 */

// Sem nenhum type parameter, vamos ter unknown
const parseUnknown = JSON.parse('{"a": 1}');

// Veja que agora temos o tipo que colocamos
const parseType = JSON.parse<{ a: 1 }>('{"a": 1}');
