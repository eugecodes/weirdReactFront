import type { Filters } from "@/src/core/app/domain/models/filters";
import { locator } from "@/src/core/app/ioc";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import type { CreateContractModel } from "@/src/core/contract/domain/models/create_contract_model";
import type { FilterContractModel } from "@/src/core/contract/domain/models/filter_contract_model";
import type { SortContract } from "@/src/core/contract/domain/interfaces/sort_contract";
import type { CreateContractUseCase } from "@/src/core/contract/domain/use_cases/create_contract_use_case";
import type { GetContractDetailUseCase } from "@/src/core/contract/domain/use_cases/get_contract_detail_use_case";
import type { PatchContractUseCase } from "@/src/core/contract/domain/use_cases/patch_contract_use_case";
import type { EditContractUseCase } from "@/src/core/contract/domain/use_cases/edit_contract_use_case";
import type { Id } from "@/src/common/utils/types";
import type { DeleteManyContractsUseCase } from "@/src/core/contract/domain/use_cases/delete_many_contracts_use_case";
import type { ExportContractsUseCase } from "@/src/core/contract/domain/use_cases/export_contracts_use_case";
import type { ListController } from "@/src/common/interfaces/list_controller";
import type { ContractModel } from "@/src/core/contract/domain/models/contract_model";
import type { MutationController } from "@/src/common/interfaces/mutation_controller";
import { withErrorHandler } from "@/src/common/utils/errors";
import { ExportArgumentsModel } from "@/src/core/app/domain/models/export_argument";
import type { GetContractsUseCase } from "@/src/core/contract/domain/use_cases/get_contracts_use_case";
import type { EditContractModel } from "@/src/core/contract/domain/models/edit_contract_model";
import type { PatchContractModel } from "@/src/core/contract/domain/models/patch_contract_model";

export default class ContractController
  implements ListController<ContractModel, FilterContractModel, SortContract>, MutationController<ContractModel>
{
  async getAll(filter: Filters<FilterContractModel, SortContract>) {
    const contractsUseCase = await locator.get<IocProvider<GetContractsUseCase>>(TYPES.GetContractsUseCase)();
    return await withErrorHandler(contractsUseCase.execute(filter));
  }

  async getOneById(id: Id) {
    const getContractUseCase = await locator.get<IocProvider<GetContractDetailUseCase>>(TYPES.GetContractDetailUseCase)();
    return await withErrorHandler(getContractUseCase.execute(id));
  }

  static async create(input: CreateContractModel) {
    const createContractUseCase = await locator.get<IocProvider<CreateContractUseCase>>(TYPES.CreateContractUseCase)();
    return await withErrorHandler(createContractUseCase.execute(input));
  }

  static async edit(input: EditContractModel, id: Id) {
    const editContractUseCase = await locator.get<IocProvider<EditContractUseCase>>(TYPES.EditContractUseCase)();
    return withErrorHandler(editContractUseCase.execute(input, id));
  }

  static async editStatus(input: PatchContractModel) {
    const pathContractUseCase = await locator.get<IocProvider<PatchContractUseCase>>(TYPES.PatchContractUseCase)();
    return withErrorHandler(pathContractUseCase.execute(input));
  }

  static async delete(id: Id) {
    const patchUseCase = await locator.get<IocProvider<PatchContractUseCase>>(TYPES.PatchContractUseCase)();
    await withErrorHandler(patchUseCase.delete(id));
  }

  async deleteMany(ids: Id[]) {
    const deleteManyUseCase = await locator.get<IocProvider<DeleteManyContractsUseCase>>(TYPES.DeleteManyContractUseCase)();
    await withErrorHandler(deleteManyUseCase.execute(ids));
  }

  async export({ filters, ids }: ExportArgumentsModel<FilterContractModel, SortContract>) {
    const exportUseCase = await locator.get<IocProvider<ExportContractsUseCase>>(TYPES.ExportContractUseCase)();
    const exportArguments = new ExportArgumentsModel({ filters, ids });
    return await withErrorHandler(exportUseCase.execute(exportArguments));
  }
}
