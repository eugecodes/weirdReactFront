import { Filters } from "@/src/core/app/domain/models/filters";
import { locator } from "@/src/core/app/ioc";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import type { CreateRateModel } from "@/src/core/rate/domain/models/create_rate_model";
import type { FilterRateModel } from "@/src/core/rate/domain/models/filter_rate_model";
import type { SortRate } from "@/src/core/rate/domain/interfaces/sort_rate";
import type { CreateRateUseCase } from "@/src/core/rate/domain/use_cases/create_rate_use_case";
import type { GetRatesUseCase } from "@/src/core/rate/domain/use_cases/get_rates_use_case";
import type { GetRateDetailUseCase } from "@/src/core/rate/domain/use_cases/get_rate_detail_use_case";
import type { PatchRateUseCase } from "@/src/core/rate/domain/use_cases/patch_rate_use_case";
import type { EditRateUseCase } from "@/src/core/rate/domain/use_cases/edit_rate_use_case";
import type { Id } from "@/src/common/utils/types";
import type { DeleteManyRatesUseCase } from "@/src/core/rate/domain/use_cases/delete_many_rates_use_case";
import type { ExportRatesUseCase } from "@/src/core/rate/domain/use_cases/export_rates_use_case";
import type { ListController } from "@/src/common/interfaces/list_controller";
import type { RateModel } from "@/src/core/rate/domain/models/rate_model";
import type { MutationController } from "@/src/common/interfaces/mutation_controller";
import { withErrorHandler } from "@/src/common/utils/errors";
import { ExportArgumentsModel } from "@/src/core/app/domain/models/export_argument";

export default class RateController implements ListController<RateModel, FilterRateModel, SortRate>, MutationController<RateModel> {
  async getAll(filter: Filters<FilterRateModel, SortRate>) {
    const ratesUseCase = await locator.get<IocProvider<GetRatesUseCase>>(TYPES.GetRatesUseCase)();
    return await withErrorHandler(ratesUseCase.execute(filter));
  }

  static async getAllByName(item: FilterRateModel) {
    const filters = new Filters<FilterRateModel, SortRate>({ item });
    const getUseCase = await locator.get<IocProvider<GetRatesUseCase>>(TYPES.GetRatesUseCase)();
    return await withErrorHandler(getUseCase.execute(filters));
  }

  async getOneById(id: Id) {
    const getRateUseCase = await locator.get<IocProvider<GetRateDetailUseCase>>(TYPES.GetRateDetailUseCase)();
    return await withErrorHandler(getRateUseCase.execute(id));
  }

  static async create(input: CreateRateModel) {
    const createRateUseCase = await locator.get<IocProvider<CreateRateUseCase>>(TYPES.CreateRateUseCase)();
    await withErrorHandler(createRateUseCase.execute(input));
  }

  static async edit(input: CreateRateModel, id: Id) {
    const editRateUseCase = await locator.get<IocProvider<EditRateUseCase>>(TYPES.EditRateUseCase)();
    return withErrorHandler(editRateUseCase.execute(input, id));
  }

  static async delete(id: Id) {
    const patchUseCase = await locator.get<IocProvider<PatchRateUseCase>>(TYPES.PatchRateUseCase)();
    await withErrorHandler(patchUseCase.delete(id));
  }

  async deleteMany(ids: Id[]) {
    const deleteManyUseCase = await locator.get<IocProvider<DeleteManyRatesUseCase>>(TYPES.DeleteManyRateUseCase)();
    await withErrorHandler(deleteManyUseCase.execute(ids));
  }

  async export({ filters, ids }: ExportArgumentsModel<FilterRateModel, SortRate>) {
    const exportUseCase = await locator.get<IocProvider<ExportRatesUseCase>>(TYPES.ExportRateUseCase)();
    const exportArguments = new ExportArgumentsModel({ filters, ids });
    return await withErrorHandler(exportUseCase.execute(exportArguments));
  }

  static async toogleActive(id: Id, currentActiveValue: boolean) {
    const patchUseCase = await locator.get<IocProvider<PatchRateUseCase>>(TYPES.PatchRateUseCase)();
    await withErrorHandler(patchUseCase.toggleEnable(id, !currentActiveValue));
  }
}
