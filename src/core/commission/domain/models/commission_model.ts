import type { Id } from "@/src/common/utils/types";
import type { PriceType } from "@/src/core/app/enums/price_type";
import type { EnergyTypes } from "@/src/core/app/enums/energy_types";
import type { BasicRateModel } from "@/src/core/rate/domain/models/basic_rate_model";
import type { BasicRateTypeModel } from "@/src/core/rate_type/domain/models/basic_rate_type_model";

export class CommissionModel {
  id: Id;
  marketerId?: Id;
  name: string;
  priceType?: PriceType;
  energyType: EnergyTypes;
  rateType?: BasicRateTypeModel;
  rates: BasicRateModel[];
  minPower?: number;
  maxPower?: number;
  minConsumption?: number;
  maxConsumption?: number;
  percentagetestCommission?: number;
  testCommission?: number;
  createdAt: string;

  constructor(commission: {
    id: Id;
    marketerId?: Id;
    name: string;
    priceType?: PriceType;
    energyType: EnergyTypes;
    rateType?: BasicRateTypeModel;
    rates: BasicRateModel[];
    minPower?: number;
    maxPower?: number;
    minConsumption?: number;
    maxConsumption?: number;
    percentagetestCommission?: number;
    testCommission?: number;
    createdAt: string;
  }) {
    this.id = commission.id;
    this.marketerId = commission.marketerId;
    this.name = commission.name;
    this.priceType = commission.priceType;
    this.energyType = commission.energyType;
    this.rateType = commission.rateType;
    this.rates = commission.rates;
    this.minPower = commission.minPower;
    this.maxPower = commission.maxPower;
    this.minConsumption = commission.minConsumption;
    this.maxConsumption = commission.maxConsumption;
    this.percentagetestCommission = commission.percentagetestCommission;
    this.testCommission = commission.testCommission;
    this.createdAt = commission.createdAt;
  }

  creationData() {
    return {
      createdAt: this.createdAt,
      createdBy: ""
    };
  }
}
