import type { Id, Option } from "@/src/common/utils/types";
import type { ClientType } from "@/src/core/app/enums/client_type";
import type { CostType } from "@/src/core/app/enums/cost_type";
import type { EnergyTypes } from "@/src/core/app/enums/energy_types";

export class CreateCostModel {
  marketerId: Id;
  name: string;
  mandatory: boolean;
  clientTypes: ClientType[];
  energyType: EnergyTypes;
  rates: Option[];
  minPower: number;
  maxPower: number;
  type: CostType;
  quantity: number;
  extraFee?: number;

  constructor(cost: {
    marketerId: Id;
    name: string;
    mandatory: boolean;
    clientTypes: ClientType[];
    energyType: EnergyTypes;
    rates: Option[];
    minPower: number;
    maxPower: number;
    type: CostType;
    quantity: number;
    extraFee?: number;
  }) {
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
  }
}
