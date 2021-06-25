import { Request, Response } from "express";

import { ListUsersService } from "../services/ListUsersService";

class ListUsersController {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async handle(request: Request, response: Response) {
    const listUsersService = new ListUsersService();

    const users = await listUsersService.execute();

    return response.json(users);
  }
}

export { ListUsersController };
