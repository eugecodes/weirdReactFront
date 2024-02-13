import { createProvider } from "@/src/common/utils/zustand";
import type { AutocompleteState } from "@/src/ui/view_models/autocomplete_state";
import { getAutocompleteInitialState } from "@/src/ui/provider/autocomplete.slice";
import ClientController from "@/src/ui/pages/client/controllers/client_controller";

interface AutocompleteProviderBuilderProps {
  filterByActiveClients?: boolean;
}

interface Props extends AutocompleteState {
  filterByActiveClients?: boolean;
}

export const useAutocompleteClientsProvider = createProvider<Props, AutocompleteProviderBuilderProps>(({ filterByActiveClients }) => {
  return (set, get) => ({
    ...getAutocompleteInitialState(get, set),
    filterByActiveClients,
    async getByName() {
      set({ isLoading: true });
      try {
        const response = await ClientController.getAllByName({
          clientName: get().filterName,
          enabled: get().filterByActiveClients
        });
        set({ items: response.items.map((client) => ({ label: client.fiscalName, id: client.id })) });
      } catch {
      } finally {
        set({ isLoading: false });
      }
    }
  });
});
