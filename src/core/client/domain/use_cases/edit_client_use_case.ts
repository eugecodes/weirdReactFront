import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { IClientRepository } from "@/src/core/client/domain/interfaces/i_client_repository";
import type { Id } from "@/src/common/utils/types";
import type { EditClientModel } from "@/src/core/client/domain/models/edit_client_model";

@injectable()
export class EditClientUseCase {
  @inject(TYPES.IClientRepository) private readonly provider!: IocProvider<IClientRepository>;

  async execute(input: EditClientModel, id: Id) {
    const repository = await this.provider();
    return repository.editClient(input, id);
  }
}
