import { createProvider } from "@/src/common/utils/zustand";
import type { EnergyTypes } from "@/src/core/app/enums/energy_types";
import RateTypeController from "@/src/ui/pages/rate_type/controllers/rate_type_controller";
import type { AutocompleteState } from "@/src/ui/view_models/autocomplete_state";
import { getAutocompleteInitialState } from "@/src/ui/provider/autocomplete.slice";

interface AutocompleteProviderBuilderProps {
  filterByActiveRateTypes?: boolean;
  energyType?: EnergyTypes;
}

interface Props extends AutocompleteState {
  energyType?: EnergyTypes;
  filterByActiveRateTypes?: boolean;
  setEnergyType: (energyType?: EnergyTypes) => void;
}

export const useAutocompleteRateTypesProvider = createProvider<Props, AutocompleteProviderBuilderProps>(({ filterByActiveRateTypes, energyType }) => {
  return (set, get) => ({
    ...getAutocompleteInitialState(get, set),
    energyType,
    setEnergyType(energyType) {
      set({ energyType });
    },
    filterByActiveRateTypes,
    async getByName() {
      set({ isLoading: true });
      try {
        const response = await RateTypeController.getAllByName({
          name: get().filterName,
          energyType: get().energyType,
          enabled: get().filterByActiveRateTypes
        });
        set({ items: response.items.map((rateType) => ({ label: rateType.name, id: rateType.id, energyType: rateType.energyType })) });
      } catch {
      } finally {
        set({ isLoading: false });
      }
    }
  });
});
