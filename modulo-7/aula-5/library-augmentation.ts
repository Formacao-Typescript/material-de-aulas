/**
 * Um outro uso de arquivos declarativos é quando queremos estender
 * bibliotecas já existentes, como por exemplo o Express.
 *
 * Nesse exemplo, vamos adicionar um objeto `user` ao objeto `Request`
 * para representar o usuário autenticado. E vamos criar um middleware
 * que vai popular esse objeto.
 */

// Branded type
export type UserId = string & { readonly brand: unique symbol };

// Esse é o tipo do nosso usuário
export interface User {
  id: UserId;
  email: string;
  name: string;
  roles: Array<"admin" | "maintainer" | "viewer">;
}

// Agora vamos para o arquivo `express-augmentation.d.ts` e vamos estender o objeto `Request`

// Vamos criar o nosso middleware que vai popular o objeto `user`
import type { Request, Response, NextFunction } from "express";

function decodeFakeToken(token: string): User | null {
  // Imaginamos que isso seria um token JWT decodificado
  if (token === "valid-token") {
    return {
      id: "123" as UserId,
      email: "email@email.com",
      name: "Lucas",
      roles: ["admin"],
    };
  }
  return null;
}

// Middleware que vai autenticar o usuário
function tryAttachUser(req: Request, _res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return next();
  }

  const user = decodeFakeToken(token);
  if (user) {
    // Veja que o objeto user é tipado agora
    req.user = user; // Populando o objeto `user` no `Request`
  }
  next();
}

// Agora podemos criar o nosso servidor
import express from "express";
const app = express();

// Vamos tentar colocar o usuário primeiro
app.use(tryAttachUser);

// Rota pública
app.get("/ping", (_req, res) => {
  res.json({
    ok: true,
    timestamp: Date.now(),
  });
});

// Rota protegida
app.get("/me", (req, res) => {
  // Podemos fazer uma assertion function, mas essa forma é mais simples
  if (!req.user) {
    return res.status(401).end();
  }

  // Veja que req.user aqui é obrigatório
  return res.json({
    id: req.user.id,
    name: req.user.name,
  });
});

app.listen(3000, () => console.log("Server listening at 3000"));

/**
 * ATENÇÃO: Embora augmentation de bibliotecas externas seja possível
 * não é considerada uma boa prática porque ela pode quebrar o código externo
 * idealmente iríamos criar uma outra interface, vamos ao arquivo recomendado.ts
 */
