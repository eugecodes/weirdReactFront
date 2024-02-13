import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { Filters } from "@/src/core/app/domain/models/filters";
import type { IClientRepository } from "@/src/core/client/domain/interfaces/i_client_repository";
import type { FilterClientModel } from "@/src/core/client/domain/models/filter_client_model";
import type { SortClient } from "../interfaces/sort_client";

@injectable()
export class GetClientsUseCase {
  @inject(TYPES.IClientRepository) private readonly provider!: IocProvider<IClientRepository>;

  async execute(input: Filters<FilterClientModel, SortClient>) {
    const repository = await this.provider();
    return repository.clients(input);
  }
}
