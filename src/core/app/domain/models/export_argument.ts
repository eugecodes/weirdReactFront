import type { Id } from "@/src/common/utils/types";
import type { Filters } from "./filters";
import { CSV, type ExportFormat } from "@/src/common/utils/export_format";

export class ExportArgumentsModel<T, S> {
  filters?: Filters<T, S>;
  ids?: Id[];
  format: ExportFormat;

  constructor({ filters, ids, format = CSV }: { filters?: Filters<T, S>; ids?: Id[]; format?: ExportFormat }) {
    this.filters = filters;
    this.ids = ids;
    this.format = format;
  }
}
