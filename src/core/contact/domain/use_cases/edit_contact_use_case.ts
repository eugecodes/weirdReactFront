import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { IContactRepository } from "@/src/core/contact/domain/interfaces/i_contact_repository";
import type { CreateInlineContactModel } from "@/src/core/contact/domain/models/create_inline_contact_model";
import type { Id } from "@/src/common/utils/types";

@injectable()
export class EditContactUseCase {
  @inject(TYPES.IContactRepository) private readonly provider!: IocProvider<IContactRepository>;

  async execute(input: CreateInlineContactModel, id: Id) {
    const repository = await this.provider();
    return repository.editContact(input, id);
  }
}
