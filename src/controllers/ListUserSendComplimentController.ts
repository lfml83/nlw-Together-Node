import { Request, Response } from "express";

import { ListUserSendComplimentService } from "../services/ListUserSendComplimentService";

class ListUserSendComplimentController {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async handle(request: Request, response: Response) {
    const { user_id } = request;

    const listUserSendComplimentService = new ListUserSendComplimentService();

    const compliments = await listUserSendComplimentService.execute(user_id);

    return response.json(compliments);
  }
}

export { ListUserSendComplimentController };
