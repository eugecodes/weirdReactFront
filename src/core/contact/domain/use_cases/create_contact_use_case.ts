import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { IContactRepository } from "@/src/core/contact/domain/interfaces/i_contact_repository";
import type { CreateContactModel } from "@/src/core/contact/domain/models/create_contact_model";

@injectable()
export class CreateContactUseCase {
  @inject(TYPES.IContactRepository) private readonly provider!: IocProvider<IContactRepository>;

  async execute(input: CreateContactModel) {
    const repository = await this.provider();
    return repository.create(input);
  }
}
