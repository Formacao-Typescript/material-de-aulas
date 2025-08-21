// É importante que esse arquivo não se chame `express.d.ts` se não ele
// vai sobrescrever todo o arquivo de tipos do Express original

// podemos importar de outros módulos
import type { User } from "./library-augmentation.ts";

export {};

declare global {
  // O pacote @types/express já tem um arquivo de declaração que é exposto
  namespace Express {
    // Vamos sobrescrever a interface Request
    interface Request {
      /**
       * Usuário autenticado para a requisição atual.
       */
      user?: User;
    }
  }
}
