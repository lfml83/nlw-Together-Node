import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  // Receber o token

  const authToken = request.headers.authorization;

  // validar se token esta preenchido
  if (!authToken) {
    return response.status(401).end();
  }
  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(
      token,
      "1df9b7af853efa775ef739665c8129eb"
    ) as IPayload;

    // Recuperar informações dp usuário
    request.user_id = sub;

    return next();
  } catch (err) {
    return response.status(401).end();
  }

  // verificar se token é valido
}
