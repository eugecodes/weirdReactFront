import { createProvider } from "@/src/common/utils/zustand";
import type { FilterClientModel } from "@/src/core/client/domain/models/filter_client_model";
import type { SortClient } from "@/src/core/client/domain/interfaces/sort_client";
import type { OrderBy } from "@/src/core/app/domain/models/order";
import type { ListState } from "@/src/ui/view_models/list_state";
import type { ClientModel } from "@/src/core/client/domain/models/client_model";
import { getListInitialState } from "@/src/ui/provider/list.slice";
import ClientController from "@/src/ui/pages/client/controllers/client_controller";

export const useListClientProvider = createProvider<ListState<ClientModel, FilterClientModel, SortClient>>(() => (set, get) => ({
  filters: {
    id: undefined,
    alias: "",
    clientType: undefined,
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
  setOrderBy(newOrderBy: OrderBy<SortClient>) {
    set({ orderBy: newOrderBy });
    get().getAll(get().filters);
  },
  ...getListInitialState(get, set, new ClientController())
}));
