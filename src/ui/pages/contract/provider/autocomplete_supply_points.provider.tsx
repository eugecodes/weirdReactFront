import { createProvider } from "@/src/common/utils/zustand";
import SupplyPointController from "@/src/ui/pages/supply_point/controllers/supply_point_controller";
import type { AutocompleteState } from "@/src/ui/view_models/autocomplete_state";
import { getAutocompleteInitialState } from "@/src/ui/provider/autocomplete.slice";
import type { Id } from "@/src/common/utils/types";

interface AutocompleteProviderBuilderProps {
  filterByActiveSupplyPoints?: boolean;
  client?: Id;
}

interface Props extends AutocompleteState {
  client?: Id;
  filterByActiveSupplyPoints?: boolean;
  setClient: (client: Id) => void;
}

export const useAutocompleteSupplyPointsProvider = createProvider<Props, AutocompleteProviderBuilderProps>(
  ({ filterByActiveSupplyPoints, client }) => {
    return (set, get) => ({
      ...getAutocompleteInitialState(get, set),
      client,
      setClient(client) {
        set({ client });
      },
      filterByActiveSupplyPoints,
      async getByName() {
        set({ isLoading: true });
        try {
          const response = await SupplyPointController.getAllByName({
            cups: get().filterName,
            clientId: get().client
          });
          set({ items: response.items.map((SupplyPoint) => ({ label: SupplyPoint.cups, id: SupplyPoint.id, energyType: SupplyPoint.energyType })) });
        } catch {
        } finally {
          set({ isLoading: false });
        }
      }
    });
  }
);
