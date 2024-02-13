import type { AtLeast, Id } from "@/src/common/utils/types";
import type { Page } from "@/src/core/app/domain/models/page";
import type { Filters } from "@/src/core/app/domain/models/filters";
import type { FilterEnergyCostModel } from "@/src/core/energy_cost/domain/models/filter_energy_cost_model";
import type { CreateEnergyCostModel } from "@/src/core/energy_cost/domain/models/create_energy_cost_model";
import type { PatchEnergyCostModel } from "@/src/core/energy_cost/domain/models/patch_energy_cost_model";
import type { EnergyCostModel } from "@/src/core/energy_cost/domain/models/energy_cost_model";
import type { SortEnergyCost } from "./sort_energy_cost";
import type { ExportArgumentsModel } from "@/src/core/app/domain/models/export_argument";
import type { FileModel } from "@/src/core/app/domain/models/file";

export interface IEnergyCostRepository {
  energyCosts(filters: Filters<FilterEnergyCostModel, SortEnergyCost>): Promise<Page<EnergyCostModel>>;
  create(input: CreateEnergyCostModel): Promise<void>;
  detailEnergyCost(energyCostId: Id): Promise<EnergyCostModel>;
  editEnergyCost(input: CreateEnergyCostModel, id: Id): Promise<EnergyCostModel>;
  patchEnergyCost(input: AtLeast<PatchEnergyCostModel, "id">): Promise<EnergyCostModel>;
  deleteEnergyCost(energyCostId: Id): Promise<void>;
  deleteMany(ids: Id[]): Promise<void>;
  exportToFile(filter: ExportArgumentsModel<FilterEnergyCostModel, SortEnergyCost>): Promise<FileModel>;
}
