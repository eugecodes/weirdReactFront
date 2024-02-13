import { createProvider } from "@/src/common/utils/zustand";
import type { FilterSupplyPointModel } from "@/src/core/supply_point/domain/models/filter_supply_point_model";
import type { SortSupplyPoint } from "@/src/core/supply_point/domain/interfaces/sort_supply_point";
import type { OrderBy } from "@/src/core/app/domain/models/order";
import type { ListState } from "@/src/ui/view_models/list_state";
import type { SupplyPointModel } from "@/src/core/supply_point/domain/models/supply_point_model";
import { getListInitialState } from "@/src/ui/provider/list.slice";
import SupplyPointController from "@/src/ui/pages/supply_point/controllers/supply_point_controller";

export const useListSupplyPointProvider = createProvider<ListState<SupplyPointModel, FilterSupplyPointModel, SortSupplyPoint>>(() => (set, get) => ({
  filters: {
    id: undefined,
    alias: "",
    supply_pointType: undefined,
    fiscal_name: "",
    cif: "",
    invoice_notification_type: undefined,
    invoice_email: "",
    invoice_postal: "",
    bank_account_holder: "",
    bank_account_number: "",
    fiscal_address: "",
    is_renewable: "",
    createdAt: ""
  },
  setOrderBy(newOrderBy: OrderBy<SortSupplyPoint>) {
    set({ orderBy: newOrderBy });
    get().getAll(get().filters);
  },
  ...getListInitialState(get, set, new SupplyPointController())
}));
