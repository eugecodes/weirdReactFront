import { Filters } from "@/src/core/app/domain/models/filters";
import { locator } from "@/src/core/app/ioc";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import type { CreateClientModel } from "@/src/core/client/domain/models/create_client_model";
import type { FilterClientModel } from "@/src/core/client/domain/models/filter_client_model";
import type { SortClient } from "@/src/core/client/domain/interfaces/sort_client";
import type { CreateClientUseCase } from "@/src/core/client/domain/use_cases/create_client_use_case";
import type { GetClientDetailUseCase } from "@/src/core/client/domain/use_cases/get_client_detail_use_case";
import type { PatchClientUseCase } from "@/src/core/client/domain/use_cases/patch_client_use_case";
import type { EditClientUseCase } from "@/src/core/client/domain/use_cases/edit_client_use_case";
import type { Id } from "@/src/common/utils/types";
import type { DeleteManyClientsUseCase } from "@/src/core/client/domain/use_cases/delete_many_clients_use_case";
import type { ExportClientsUseCase } from "@/src/core/client/domain/use_cases/export_clients_use_case";
import type { ListController } from "@/src/common/interfaces/list_controller";
import type { ClientModel } from "@/src/core/client/domain/models/client_model";
import type { MutationController } from "@/src/common/interfaces/mutation_controller";
import { withErrorHandler } from "@/src/common/utils/errors";
import { ExportArgumentsModel } from "@/src/core/app/domain/models/export_argument";
import type { GetClientsUseCase } from "@/src/core/client/domain/use_cases/get_clients_use_case";
import type { EditClientModel } from "@/src/core/client/domain/models/edit_client_model";

export default class ClientController implements ListController<ClientModel, FilterClientModel, SortClient>, MutationController<ClientModel> {
  async getAll(filter: Filters<FilterClientModel, SortClient>) {
    const clientsUseCase = await locator.get<IocProvider<GetClientsUseCase>>(TYPES.GetClientsUseCase)();
    return await withErrorHandler(clientsUseCase.execute(filter));
  }

  static async getAllByName(item: FilterClientModel) {
    const filters = new Filters<FilterClientModel, SortClient>({ item });
    const getUseCase = await locator.get<IocProvider<GetClientsUseCase>>(TYPES.GetClientsUseCase)();
    return await withErrorHandler(getUseCase.execute(filters));
  }

  async getOneById(id: Id) {
    const getClientUseCase = await locator.get<IocProvider<GetClientDetailUseCase>>(TYPES.GetClientDetailUseCase)();
    return await withErrorHandler(getClientUseCase.execute(id));
  }

  static async create(input: CreateClientModel) {
    const createClientUseCase = await locator.get<IocProvider<CreateClientUseCase>>(TYPES.CreateClientUseCase)();
    return await withErrorHandler(createClientUseCase.execute(input));
  }

  static async edit(input: EditClientModel, id: Id) {
    const editClientUseCase = await locator.get<IocProvider<EditClientUseCase>>(TYPES.EditClientUseCase)();
    return withErrorHandler(editClientUseCase.execute(input, id));
  }

  static async delete(id: Id) {
    const patchUseCase = await locator.get<IocProvider<PatchClientUseCase>>(TYPES.PatchClientUseCase)();
    await withErrorHandler(patchUseCase.delete(id));
  }

  async deleteMany(ids: Id[]) {
    const deleteManyUseCase = await locator.get<IocProvider<DeleteManyClientsUseCase>>(TYPES.DeleteManyClientUseCase)();
    await withErrorHandler(deleteManyUseCase.execute(ids));
  }

  async export({ filters, ids }: ExportArgumentsModel<FilterClientModel, SortClient>) {
    const exportUseCase = await locator.get<IocProvider<ExportClientsUseCase>>(TYPES.ExportClientUseCase)();
    const exportArguments = new ExportArgumentsModel({ filters, ids });
    return await withErrorHandler(exportUseCase.execute(exportArguments));
  }
}
