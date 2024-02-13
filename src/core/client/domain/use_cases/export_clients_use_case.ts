import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { IClientRepository } from "@/src/core/client/domain/interfaces/i_client_repository";
import type { FilterClientModel } from "@/src/core/client/domain/models/filter_client_model";
import type { SortClient } from "@/src/core/client/domain/interfaces/sort_client";
import type { ExportArgumentsModel } from "@/src/core/app/domain/models/export_argument";

@injectable()
export class ExportClientsUseCase {
  @inject(TYPES.IClientRepository) private readonly provider!: IocProvider<IClientRepository>;

  async execute(filter: ExportArgumentsModel<FilterClientModel, SortClient>) {
    const repository = await this.provider();
    return repository.exportToFile(filter);
  }
}
