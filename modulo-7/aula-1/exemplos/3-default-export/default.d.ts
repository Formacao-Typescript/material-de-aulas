interface Config {
  apiUrl: string;
  timeout: number;
}

// Para podermos exportar de forma default, temos que declarar a interface
// Lembre-se que declare SOMENTE é válido dentro de .d.ts
declare const config: Config;

// depois exportá-la como padrão
export default config;
