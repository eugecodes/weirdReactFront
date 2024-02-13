import type { EnergyTypes } from "@/src/core/app/enums/energy_types";

export class CreateRateTypeModel {
  name: string;
  energyType: EnergyTypes;
  minPower?: number;
  maxPower?: number;

  constructor(rateType: { name: string; energyType: EnergyTypes; minPower?: number; maxPower?: number }) {
    this.name = rateType.name;
    this.energyType = rateType.energyType;
    this.minPower = rateType.minPower;
    this.maxPower = rateType.maxPower;
  }
}
