import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";

import { UsersRepositories } from "../repositories/UsersRepositories";

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);
    // verificar se email existe

    const user = await usersRepositories.findOne({
      email,
    });

    if (!user) {
      throw new Error("Email/Password incorrect");
    }
    // verificar se senha esta correta

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email/Password incorrect");
    }
    // primeiro é o payload e depois a chave secreta. por ultimo subject e expiracao
    const token = sign(
      {
        email: user.email,
      },
      "1df9b7af853efa775ef739665c8129eb", // chave secreta md5 generator
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );
    // Gerar o token
    return token;
  }
}

export { AuthenticateUserService };
