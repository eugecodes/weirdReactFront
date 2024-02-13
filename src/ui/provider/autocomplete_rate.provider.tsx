import { createProvider } from "@/src/common/utils/zustand";
import RateController from "@/src/ui/pages/rate/controllers/rate_controller";
import type { AutocompleteState } from "@/src/ui/view_models/autocomplete_state";
import { getAutocompleteInitialState } from "@/src/ui/provider/autocomplete.slice";
import type { PriceType } from "@/src/core/app/enums/price_type";
import type { EnergyTypes } from "@/src/core/app/enums/energy_types";
import type { Id, Option } from "@/src/common/utils/types";

interface AutocompleteProviderBuilderProps {
  filterByActiveRate?: boolean;
  priceType?: PriceType;
  energyType?: EnergyTypes;
}

interface Props extends AutocompleteState {
  filterByActiveRate?: boolean;
  energyType?: EnergyTypes;
  rateType?: Option[];
  priceType?: PriceType;
  marketerId?: Id;
  setEnergyType: (energyType?: EnergyTypes) => void;
  setRateType: (rateType?: Option[]) => void;
  setPriceType: (priceType?: PriceType) => void;
  setMarketerId: (marketerId?: Id) => void;
}

export const useAutocompleteRateProvider = createProvider<Props, AutocompleteProviderBuilderProps>(
  ({ filterByActiveRate, priceType, energyType }) => {
    return (set, get) => ({
      ...getAutocompleteInitialState(get, set),
      energyType,
      priceType,
      filterByActiveRate,
      marketerId: undefined,
      setEnergyType: (energyType) => set({ energyType }),
      setRateType: (rateType) => set({ rateType }),
      setPriceType: (priceType) => set({ priceType }),
      setMarketerId: (marketerId) => set({ marketerId }),
      async getByName() {
        set({ isLoading: true });
        try {
          const response = await RateController.getAllByName({
            name: get().filterName,
            enabled: get().filterByActiveRate,
            priceType: get().priceType,
            rateType: get().rateType,
            energyType: get().energyType,
            marketer: get().marketerId ? { id: get().marketerId as number, label: "" } : null
          });
          set({ items: response.items.map((rate) => ({ label: rate.name, id: rate.id, rateType: rate.rateType })) });
        } catch {
        } finally {
          set({ isLoading: false });
        }
      }
    });
  }
);
