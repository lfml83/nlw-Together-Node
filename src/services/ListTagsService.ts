import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";

import { TagsRepositories } from "../repositories/TagsRepositories";

class ListTagsService {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async execute() {
    const tagsRepositories = getCustomRepository(TagsRepositories);

    const tags = await tagsRepositories.find();
    // tags = tags.map((tag) => ({ ...tag, nameCustom: `#${tag.name}` })); // o 3 pontos significa quie ele pega todo objero dentro da tag

    return classToPlain(tags);
  }
}

export { ListTagsService };
