import type { Id } from "@/src/common/utils/types";
import type { EnergyTypes } from "@/src/core/app/enums/energy_types";
import type { UserModel } from "@/src/core/user/domain/models/user_model";

export class RateTypeModel {
  id: Id;
  name: string;
  energyType: EnergyTypes;
  minPower?: number;
  maxPower?: number;
  enabled: boolean;
  createdAt: string;
  responsible?: UserModel;

  constructor(rateType: {
    id: Id;
    name: string;
    energyType: EnergyTypes;
    minPower?: number;
    maxPower?: number;
    enabled: boolean;
    createdAt: string;
    responsible?: UserModel;
  }) {
    this.id = rateType.id;
    this.name = rateType.name;
    this.energyType = rateType.energyType;
    this.enabled = rateType.enabled;
    this.minPower = rateType.minPower;
    this.maxPower = rateType.maxPower;
    this.createdAt = rateType.createdAt;

    if (rateType.responsible) {
      this.responsible = rateType.responsible;
    }
  }

  creationData() {
    return {
      createdAt: this.createdAt,
      createdBy: this.responsible?.name || ""
    };
  }
}
