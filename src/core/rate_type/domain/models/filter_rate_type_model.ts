import type { EnergyTypes } from "@/src/core/app/enums/energy_types";

export class FilterRateTypeModel {
  name?: string;
  energyType?: EnergyTypes;
  minPower?: string;
  maxPower?: string;
  enabled?: boolean;
  createdAt?: string;
  responsible?: string;

  constructor(rateType: {
    name: string;
    energyType: EnergyTypes;
    minPower?: string;
    maxPower?: string;
    enabled: boolean;
    createdAt: string;
    responsible?: string;
  }) {
    this.name = rateType.name;
    this.energyType = rateType.energyType;
    this.enabled = rateType.enabled;
    this.minPower = rateType.minPower;
    this.maxPower = rateType.maxPower;
    this.createdAt = rateType.createdAt;
    this.responsible = rateType.responsible;
  }
}
