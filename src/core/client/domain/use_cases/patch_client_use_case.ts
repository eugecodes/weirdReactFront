import type { AtLeast, Id } from "@/src/common/utils/types";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { IClientRepository } from "@/src/core/client/domain/interfaces/i_client_repository";
import type { PatchClientModel } from "@/src/core/client/domain/models/patch_client_model";

@injectable()
export class PatchClientUseCase {
  @inject(TYPES.IClientRepository) private readonly provider!: IocProvider<IClientRepository>;

  async execute(input: AtLeast<PatchClientModel, "id">) {
    const repository = await this.provider();
    return repository.patchClient(input);
  }

  async delete(id: Id) {
    const repository = await this.provider();
    return repository.deleteClient(id);
  }
}
