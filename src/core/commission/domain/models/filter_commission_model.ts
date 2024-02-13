import type { Id, Option } from "@/src/common/utils/types";
import type { EnergyTypes } from "@/src/core/app/enums/energy_types";
import type { PriceType } from "@/src/core/app/enums/price_type";

export class FilterCommissionModel {
  marketerId?: Id;
  name?: string;
  priceType?: PriceType;
  energyType?: EnergyTypes;
  rateType?: Option[];
  rates?: Option[];
  minPower?: string;
  maxPower?: string;
  minConsumption?: string;
  maxConsumption?: string;
  percentagetestCommission?: string;
  testCommission?: string;
  createdAt?: string;

  constructor(commission: {
    marketerId: Id;
    name: string;
    priceType: PriceType;
    energyType: EnergyTypes;
    rateType?: Option[];
    rates: Option[];
    minPower?: string;
    maxPower?: string;
    minConsumption?: string;
    maxConsumption?: string;
    percentagetestCommission?: string;
    testCommission?: string;
    createdAt: string;
  }) {
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
}
