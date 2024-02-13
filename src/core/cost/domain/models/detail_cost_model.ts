import type { Id } from "@/src/common/utils/types";
import type { ClientType } from "@/src/core/app/enums/client_type";
import type { CostType } from "@/src/core/app/enums/cost_type";
import type { EnergyTypes } from "@/src/core/app/enums/energy_types";
import type { BasicRateModel } from "@/src/core/rate/domain/models/basic_rate_model";

export class DetailCostModel {
  id: Id;
  marketerId?: Id;
  name: string;
  mandatory: boolean;
  clientTypes: ClientType[];
  energyType?: EnergyTypes;
  rates: BasicRateModel[];
  minPower: number;
  maxPower: number;
  type: CostType;
  quantity: number;
  extraFee?: number;
  enabled: boolean;
  createdAt: string;

  constructor(cost: {
    id: Id;
    marketerId?: Id;
    name: string;
    mandatory: boolean;
    clientTypes: ClientType[];
    energyType?: EnergyTypes;
    rates: BasicRateModel[];
    minPower: number;
    maxPower: number;
    type: CostType;
    quantity: number;
    extraFee?: number;
    enabled: boolean;
    createdAt: string;
  }) {
    this.id = cost.id;
    this.marketerId = cost.marketerId;
    this.name = cost.name;
    this.mandatory = cost.mandatory;
    this.clientTypes = cost.clientTypes;
    this.energyType = cost.energyType;
    this.rates = cost.rates;
    this.minPower = cost.minPower;
    this.maxPower = cost.maxPower;
    this.type = cost.type;
    this.quantity = cost.quantity;
    this.extraFee = cost.extraFee;
    this.enabled = cost.enabled;
    this.createdAt = cost.createdAt;
  }

  creationData() {
    return {
      createdAt: this.createdAt,
      createdBy: ""
    };
  }
}
