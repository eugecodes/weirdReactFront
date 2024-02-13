import { createProvider } from "@/src/common/utils/zustand";
import type { FilterContractModel } from "@/src/core/contract/domain/models/filter_contract_model";
import type { SortContract } from "@/src/core/contract/domain/interfaces/sort_contract";
import type { OrderBy } from "@/src/core/app/domain/models/order";
import type { ListState } from "@/src/ui/view_models/list_state";
import type { ContractModel } from "@/src/core/contract/domain/models/contract_model";
import { getListInitialState } from "@/src/ui/provider/list.slice";
import ContractController from "@/src/ui/pages/contract/controllers/contract_controller";

export const useListContractProvider = createProvider<ListState<ContractModel, FilterContractModel, SortContract>>(() => (set, get) => ({
  filters: {
    id: undefined,
    supply_point_id: undefined,
    rate_id: undefined,
    power_1: undefined,
    power_2: undefined,
    power_3: undefined,
    power_4: undefined,
    power_5: undefined,
    power_6: undefined,
    start_date: "",
    end_date: "",
    expected_end_date: "",
    preferred_start_date: "",
    period: undefined,
    signature_first_name: "",
    signature_last_name: "",
    signature_dni: "",
    signature_email: "",
    signature_phone: "",
    is_active: true,
    create_at: "",
    status: undefined,
    supply_point: undefined,
    rate: undefined
  },
  setOrderBy(newOrderBy: OrderBy<SortContract>) {
    set({ orderBy: newOrderBy });
    get().getAll(get().filters);
  },
  ...getListInitialState(get, set, new ContractController())
}));
