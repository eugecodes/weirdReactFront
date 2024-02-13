import type { AtLeast, Id } from "@/src/common/utils/types";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { IContactRepository } from "@/src/core/contact/domain/interfaces/i_contact_repository";
import type { PatchContactModel } from "@/src/core/contact/domain/models/patch_contact_model";

@injectable()
export class PatchContactUseCase {
  @inject(TYPES.IContactRepository) private readonly provider!: IocProvider<IContactRepository>;

  async execute(input: AtLeast<PatchContactModel, "id">) {
    const repository = await this.provider();
    return repository.patchContact(input);
  }

  async delete(id: Id) {
    const repository = await this.provider();
    return repository.deleteContact(id);
  }
}
