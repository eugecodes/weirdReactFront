import type { Option } from "@/src/common/utils/types";

export interface AutocompleteState {
  isLoading: boolean;
  items: Option[];
  setFilterName: (name: string) => void;
  filterName: string;
  getByName: () => void;
}
