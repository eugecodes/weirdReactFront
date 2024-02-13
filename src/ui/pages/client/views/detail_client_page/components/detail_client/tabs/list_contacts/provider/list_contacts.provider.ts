import { createProvider } from "@/src/common/utils/zustand";
import type { FilterContactModel } from "@/src/core/contact/domain/models/filter_contact_model";
import ContactController from "@/src/ui/pages/contact/controllers/contact_controller";
import type { OrderBy } from "@/src/core/app/domain/models/order";
import type { ContactModel } from "@/src/core/contact/domain/models/contact_model";
import type { SortContact } from "@/src/core/contact/domain/interfaces/sort_contact";
import { getListInitialState } from "@/src/ui/provider/list.slice";
import type { ListState } from "@/src/ui/view_models/list_state";

interface ContactProviderBuilderProps {
  filters: FilterContactModel;
}

export const useListContactProvider = createProvider<ListState<ContactModel, FilterContactModel, SortContact>, ContactProviderBuilderProps>(
  ({ filters }) => {
    return (set, get) => ({
      filters: {
        ...filters,
        client_id: "",
        name: "",
        email: "",
        phone: ""
      },
      setOrderBy(newOrderBy: OrderBy<ContactModel>) {
        set({ orderBy: newOrderBy });
        get().getAll(get().filters);
      },
      ...getListInitialState(get, set, new ContactController())
    });
  }
);
