import type { Id } from "@/src/common/utils/types";
import type { EnergyTypes } from "@/src/core/app/enums/energy_types";

export class BasicRateTypeModel {
  id: Id;
  name: string;
  energyType: EnergyTypes;

  constructor(rateType: { id: Id; name: string; energyType: EnergyTypes }) {
    this.id = rateType.id;
    this.name = rateType.name;
    this.energyType = rateType.energyType;
  }
}
