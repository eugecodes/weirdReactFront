import type { StoreApi } from "zustand";
import type { AutocompleteState } from "../view_models/autocomplete_state";

export const AUTOCOMPLETE_INITIAL_PROPS = {
  isLoading: false,
  items: [],
  filterName: ""
};

export function getAutocompleteInitialState(get: StoreApi<AutocompleteState>["getState"], set: StoreApi<AutocompleteState>["setState"]) {
  return {
    ...AUTOCOMPLETE_INITIAL_PROPS,
    setFilterName(name: string) {
      set({ filterName: name });
    }
  };
}
