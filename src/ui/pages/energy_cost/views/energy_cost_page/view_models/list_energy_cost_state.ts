import type { SortEnergyCost } from "@/src/core/energy_cost/domain/interfaces/sort_energy_cost";
import type { EnergyCostModel } from "@/src/core/energy_cost/domain/models/energy_cost_model";
import type { EnergyCostFilterValues } from "./energy_cost_filter_values";

export interface ListEnergyCostState {
  page: number;
  setPage(newPage: number): void;
  isLoading: boolean;
  rows: EnergyCostModel[];
  size: number;
  setSize(newSize: number): void;
  total: number;
  getAll(filter: EnergyCostFilterValues): Promise<void>;
  filters: EnergyCostFilterValues;
  orderBy?: SortEnergyCost;
  setOrderBy(newOrderBy: SortEnergyCost): void;
}
