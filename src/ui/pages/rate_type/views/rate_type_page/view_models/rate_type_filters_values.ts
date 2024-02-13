import type { EnergyTypes } from "@/src/core/app/enums/energy_types";

export interface RateTypeFilterValues {
  name?: string;
  energyType?: EnergyTypes;
  minPower?: string;
  maxPower?: string;
  enabled?: boolean;
  createdAt?: string;
  responsible?: string;
}
