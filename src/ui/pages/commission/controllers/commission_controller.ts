import type { Filters } from "@/src/core/app/domain/models/filters";
import { locator } from "@/src/core/app/ioc";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import type { CreateCommissionModel } from "@/src/core/commission/domain/models/create_commission_model";
import type { FilterCommissionModel } from "@/src/core/commission/domain/models/filter_commission_model";
import type { SortCommission } from "@/src/core/commission/domain/interfaces/sort_commission";
import type { CreateCommissionUseCase } from "@/src/core/commission/domain/use_cases/create_commission_use_case";
import type { GetCommissionsUseCase } from "@/src/core/commission/domain/use_cases/get_commissions_use_case";
import type { GetCommissionDetailUseCase } from "@/src/core/commission/domain/use_cases/get_commission_detail_use_case";
import type { PatchCommissionUseCase } from "@/src/core/commission/domain/use_cases/patch_commission_use_case";
import type { EditCommissionUseCase } from "@/src/core/commission/domain/use_cases/edit_commission_use_case";
import type { Id } from "@/src/common/utils/types";
import type { DeleteManyCommissionsUseCase } from "@/src/core/commission/domain/use_cases/delete_many_commissions_use_case";
import type { ExportCommissionsUseCase } from "@/src/core/commission/domain/use_cases/export_commissions_use_case";
import type { ListController } from "@/src/common/interfaces/list_controller";
import type { CommissionModel } from "@/src/core/commission/domain/models/commission_model";
import type { MutationController } from "@/src/common/interfaces/mutation_controller";
import type { DetailCommissionModel } from "@/src/core/commission/domain/models/detail_commission_model";
import { withErrorHandler } from "@/src/common/utils/errors";
import { ExportArgumentsModel } from "@/src/core/app/domain/models/export_argument";

export default class CommissionController
  implements ListController<CommissionModel, FilterCommissionModel, SortCommission>, MutationController<DetailCommissionModel>
{
  async getAll(filter: Filters<FilterCommissionModel, SortCommission>) {
    const commissionsUseCase = await locator.get<IocProvider<GetCommissionsUseCase>>(TYPES.GetCommissionsUseCase)();
    return await withErrorHandler(commissionsUseCase.execute(filter));
  }

  async getOneById(id: Id) {
    const getCommissionUseCase = await locator.get<IocProvider<GetCommissionDetailUseCase>>(TYPES.GetCommissionDetailUseCase)();
    return await withErrorHandler(getCommissionUseCase.execute(id));
  }

  static async create(input: CreateCommissionModel) {
    const createCommissionUseCase = await locator.get<IocProvider<CreateCommissionUseCase>>(TYPES.CreateCommissionUseCase)();
    await withErrorHandler(createCommissionUseCase.execute(input));
  }

  static async edit(input: CreateCommissionModel, id: Id) {
    const editCommissionUseCase = await locator.get<IocProvider<EditCommissionUseCase>>(TYPES.EditCommissionUseCase)();
    return await withErrorHandler(editCommissionUseCase.execute(input, id));
  }

  static async delete(id: Id) {
    const patchUseCase = await locator.get<IocProvider<PatchCommissionUseCase>>(TYPES.PatchCommissionUseCase)();
    await withErrorHandler(patchUseCase.delete(id));
  }

  async deleteMany(ids: Id[]) {
    const deleteManyUseCase = await locator.get<IocProvider<DeleteManyCommissionsUseCase>>(TYPES.DeleteManyCommissionUseCase)();
    await withErrorHandler(deleteManyUseCase.execute(ids));
  }

  async export({ filters, ids }: ExportArgumentsModel<FilterCommissionModel, SortCommission>) {
    const exportUseCase = await locator.get<IocProvider<ExportCommissionsUseCase>>(TYPES.ExportCommissionUseCase)();
    const exportArguments = new ExportArgumentsModel({ filters, ids });
    return await withErrorHandler(exportUseCase.execute(exportArguments));
  }
}
