import express from "express";
import type { NextFunction, Request, Response, RequestHandler } from "express";
import type { User } from "./library-augmentation.ts";

interface AuthenticatedRequest extends Request {
  user: User;
}

// Nossa mesma função
function decodeFakeToken(token: string): User | null {
  // Imaginamos que isso seria um token JWT decodificado
  if (token === "valid-token") {
    return {
      id: "123" as User["id"],
      email: "email@email.com",
      name: "Lucas",
      roles: ["admin"],
    };
  }
  return null;
}

// fazemos um wrapper do handler principal
type AuthedHandler = (req: AuthenticatedRequest, res: Response) => unknown;
export function withAuth(handler: AuthedHandler): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return next();
    }

    const user = decodeFakeToken(token);
    if (!user) {
      res.status(401);
      return;
    }

    // setamos a request
    (req as any).user = user;
    // chamamos o handler original
    return handler(req as AuthenticatedRequest, res);
  };
}

const app = express();

app.get(
  "/me",
  withAuth((req, res) => {
    res.json(req.user);
  }),
);

app.listen(3000);
