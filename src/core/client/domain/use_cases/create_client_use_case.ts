import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { IClientRepository } from "@/src/core/client/domain/interfaces/i_client_repository";
import type { CreateClientModel } from "@/src/core/client/domain/models/create_client_model";

@injectable()
export class CreateClientUseCase {
  @inject(TYPES.IClientRepository) private readonly provider!: IocProvider<IClientRepository>;

  async execute(input: CreateClientModel) {
    const repository = await this.provider();
    return repository.create(input);
  }
}
