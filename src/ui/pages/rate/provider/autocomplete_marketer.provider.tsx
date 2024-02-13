import { createProvider } from "@/src/common/utils/zustand";
import type { AutocompleteState } from "@/src/ui/view_models/autocomplete_state";
import { getAutocompleteInitialState } from "@/src/ui/provider/autocomplete.slice";
import MarketerController from "@/src/ui/pages/marketer/controllers/marketer_controller";

interface AutocompleteProviderBuilderProps {
  filterByActiveMarketers?: boolean;
}

interface Props extends AutocompleteState {
  filterByActiveMarketers?: boolean;
}

export const useAutocompleteMarketersProvider = createProvider<Props, AutocompleteProviderBuilderProps>(({ filterByActiveMarketers }) => {
  return (set, get) => ({
    ...getAutocompleteInitialState(get, set),
    filterByActiveMarketers,
    async getByName() {
      set({ isLoading: true });
      try {
        const response = await MarketerController.getAllByName({
          name: get().filterName,
          enabled: get().filterByActiveMarketers
        });
        set({ items: response.items.map((marketer) => ({ label: marketer.name, id: marketer.id })) });
      } catch {
      } finally {
        set({ isLoading: false });
      }
    }
  });
});
