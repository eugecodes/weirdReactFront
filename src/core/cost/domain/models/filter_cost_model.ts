import type { Id, Option } from "@/src/common/utils/types";
import type { ClientType } from "@/src/core/app/enums/client_type";
import type { CostType } from "@/src/core/app/enums/cost_type";

export class FilterCostModel {
  marketerId?: Id;
  name?: string;
  clientTypes?: ClientType[];
  rates?: Option[];
  minPower?: string;
  maxPower?: string;
  quantity?: string;
  costType?: CostType;
  enabled?: boolean;
  createdAt?: string;
  responsible?: string;

  constructor(cost: {
    marketerId?: Id;
    name?: string;
    clientTypes?: ClientType[];
    rates?: Option[];
    minPower?: string;
    maxPower?: string;
    quantity?: string;
    costType?: CostType;
    enabled?: boolean;
    createdAt?: string;
    responsible?: string;
  }) {
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

    if (cost.responsible) {
      this.responsible = cost.responsible;
    }
  }
}
