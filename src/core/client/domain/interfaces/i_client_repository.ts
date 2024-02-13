import type { AtLeast, Id } from "@/src/common/utils/types";
import type { Page } from "@/src/core/app/domain/models/page";
import type { Filters } from "@/src/core/app/domain/models/filters";
import type { FilterClientModel } from "@/src/core/client/domain/models/filter_client_model";
import type { CreateClientModel } from "@/src/core/client/domain/models/create_client_model";
import type { EditClientModel } from "@/src/core/client/domain/models/edit_client_model";
import type { PatchClientModel } from "@/src/core/client/domain/models/patch_client_model";
import type { ClientModel } from "@/src/core/client/domain/models/client_model";
import type { SortClient } from "./sort_client";
import type { ExportArgumentsModel } from "@/src/core/app/domain/models/export_argument";
import type { FileModel } from "@/src/core/app/domain/models/file";
import type { DetailClientModel } from "@/src/core/client/domain/models/detail_client_model";

export interface IClientRepository {
  clients(filters: Filters<FilterClientModel, SortClient>): Promise<Page<ClientModel>>;
  create(input: CreateClientModel): Promise<void>;
  detailClient(clientId: Id): Promise<DetailClientModel>;
  editClient(input: EditClientModel, id: Id): Promise<DetailClientModel>;
  patchClient(input: AtLeast<PatchClientModel, "id">): Promise<ClientModel>;
  deleteClient(clientId: Id): Promise<void>;
  deleteMany(ids: Id[]): Promise<void>;
  exportToFile(filter: ExportArgumentsModel<FilterClientModel, SortClient>): Promise<FileModel>;
}
