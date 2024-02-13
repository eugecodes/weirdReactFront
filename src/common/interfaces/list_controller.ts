import type { Filters } from "@/src/core/app/domain/models/filters";
import type { Page } from "@/src/core/app/domain/models/page";
import type { Id } from "../utils/types";
import type { FileModel } from "@/src/core/app/domain/models/file";

export interface ListController<Model, Filter, Sort> {
  getAll(filter: Filters<Filter, Sort>): Promise<Page<Model>>;

  deleteMany(ids: Id[]): Promise<void>;

  export({ filters, ids }: { filters?: Filters<Filter, Sort>; ids?: Id[] }): Promise<FileModel>;
}
