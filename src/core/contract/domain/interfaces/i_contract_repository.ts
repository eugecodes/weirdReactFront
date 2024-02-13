import type { AtLeast, Id } from "@/src/common/utils/types";
import type { Page } from "@/src/core/app/domain/models/page";
import type { Filters } from "@/src/core/app/domain/models/filters";
import type { FilterContractModel } from "@/src/core/contract/domain/models/filter_contract_model";
import type { CreateContractModel } from "@/src/core/contract/domain/models/create_contract_model";
import type { EditContractModel } from "@/src/core/contract/domain/models/edit_contract_model";
import type { PatchContractModel } from "@/src/core/contract/domain/models/patch_contract_model";
import type { ContractModel } from "@/src/core/contract/domain/models/contract_model";
import type { SortContract } from "./sort_contract";
import type { ExportArgumentsModel } from "@/src/core/app/domain/models/export_argument";
import type { FileModel } from "@/src/core/app/domain/models/file";
import type { DetailContractModel } from "@/src/core/contract/domain/models/detail_contract_model";

export interface IContractRepository {
  contracts(filters: Filters<FilterContractModel, SortContract>): Promise<Page<ContractModel>>;
  create(input: CreateContractModel): Promise<void>;
  detailContract(contractId: Id): Promise<DetailContractModel>;
  editContract(input: EditContractModel, id: Id): Promise<DetailContractModel>;
  patchContract(input: AtLeast<PatchContractModel, "id">): Promise<ContractModel>;
  deleteContract(contractId: Id): Promise<void>;
  deleteMany(ids: Id[]): Promise<void>;
  exportToFile(filter: ExportArgumentsModel<FilterContractModel, SortContract>): Promise<FileModel>;
}
