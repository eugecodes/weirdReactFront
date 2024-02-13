import type { Id } from "@/src/common/utils/types";
import type { ClientType } from "@/src/core/app/enums/client_type";
import type { CostType } from "@/src/core/app/enums/cost_type";
import type { BasicRateModel } from "@/src/core/rate/domain/models/basic_rate_model";

export class CostModel {
  id: Id;
  marketerId?: Id;
  name: string;
  clientTypes: ClientType[];
  rates: BasicRateModel[];
  minPower: number;
  maxPower: number;
  quantity: number;
  costType: CostType;
  enabled: boolean;
  createdAt: string;

  constructor(cost: {
    id: Id;
    marketerId?: Id;
    name: string;
    clientTypes: ClientType[];
    rates: BasicRateModel[];
    minPower: number;
    maxPower: number;
    quantity: number;
    costType: CostType;
    enabled: boolean;
    createdAt: string;
  }) {
    this.id = cost.id;
    this.marketerId = cost.marketerId;
    this.name = cost.name;
    this.clientTypes = cost.clientTypes;
    this.rates = cost.rates;
    this.minPower = cost.minPower;
    this.maxPower = cost.maxPower;
    this.quantity = cost.quantity;
    this.costType = cost.costType;
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
