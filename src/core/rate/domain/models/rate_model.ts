import type { Id } from "@/src/common/utils/types";
import type { ClientType } from "@/src/core/app/enums/client_type";
import type { PriceType } from "@/src/core/app/enums/price_type";
import type { BasicMarketerModel } from "@/src/core/marketer/domain/models/basic_marketer_model";
import type { BasicRateTypeModel } from "@/src/core/rate_type/domain/models/basic_rate_type_model";
import type { UserModel } from "@/src/core/user/domain/models/user_model";

export class RateModel {
  id: Id;
  marketer: BasicMarketerModel;
  name: string;
  priceType: PriceType;
  clientTypes: ClientType[];
  rateType: BasicRateTypeModel;
  permanency: boolean;
  length: number;
  isFullRenewable?: boolean;
  compensationSurplus?: boolean;
  compensationSurplusValue?: number;
  minPower?: number;
  maxPower?: number;
  minConsumption?: number;
  maxConsumption?: number;
  energyPrice1?: number;
  energyPrice2?: number;
  energyPrice3?: number;
  energyPrice4?: number;
  energyPrice5?: number;
  energyPrice6?: number;
  powerPrice1?: number;
  powerPrice2?: number;
  powerPrice3?: number;
  powerPrice4?: number;
  powerPrice5?: number;
  powerPrice6?: number;
  fixedTermPrice?: number;
  enabled: boolean;
  createdAt: string;
  responsible?: UserModel;

  constructor(rate: {
    id: Id;
    marketer: BasicMarketerModel;
    name: string;
    priceType: PriceType;
    clientTypes: ClientType[];
    rateType: BasicRateTypeModel;
    permanency: boolean;
    length: number;
    isFullRenewable?: boolean;
    compensationSurplus?: boolean;
    compensationSurplusValue?: number;
    minPower?: number;
    maxPower?: number;
    minConsumption?: number;
    maxConsumption?: number;
    energyPrice1?: number;
    energyPrice2?: number;
    energyPrice3?: number;
    energyPrice4?: number;
    energyPrice5?: number;
    energyPrice6?: number;
    powerPrice1?: number;
    powerPrice2?: number;
    powerPrice3?: number;
    powerPrice4?: number;
    powerPrice5?: number;
    powerPrice6?: number;
    fixedTermPrice?: number;
    enabled: boolean;
    createdAt: string;
    responsible?: UserModel;
  }) {
    this.id = rate.id;
    this.marketer = rate?.marketer;
    this.name = rate.name;
    this.priceType = rate.priceType;
    this.clientTypes = rate.clientTypes;
    this.rateType = rate.rateType;
    this.permanency = rate.permanency;
    this.length = rate.length;
    this.isFullRenewable = rate.isFullRenewable;
    this.compensationSurplus = rate.compensationSurplus;
    this.compensationSurplusValue = rate.compensationSurplusValue;
    this.minPower = rate.minPower;
    this.maxPower = rate.maxPower;
    this.minConsumption = rate.minConsumption;
    this.maxConsumption = rate.maxConsumption;
    this.energyPrice1 = rate.energyPrice1;
    this.energyPrice2 = rate.energyPrice2;
    this.energyPrice3 = rate.energyPrice3;
    this.energyPrice4 = rate.energyPrice4;
    this.energyPrice5 = rate.energyPrice5;
    this.energyPrice6 = rate.energyPrice6;
    this.powerPrice1 = rate.powerPrice1;
    this.powerPrice2 = rate.powerPrice2;
    this.powerPrice3 = rate.powerPrice3;
    this.powerPrice4 = rate.powerPrice4;
    this.powerPrice5 = rate.powerPrice5;
    this.powerPrice6 = rate.powerPrice6;
    this.fixedTermPrice = rate.fixedTermPrice;
    this.enabled = rate.enabled;
    this.createdAt = rate.createdAt;
    this.responsible = rate.responsible;
  }

  creationData() {
    return {
      createdAt: this.createdAt,
      createdBy: this.responsible?.name || ""
    };
  }

  prices() {
    return {
      energyPrice1: this.energyPrice1,
      energyPrice2: this.energyPrice2,
      energyPrice3: this.energyPrice3,
      energyPrice4: this.energyPrice4,
      energyPrice5: this.energyPrice5,
      energyPrice6: this.energyPrice6,
      powerPrice1: this.powerPrice1,
      powerPrice2: this.powerPrice2,
      powerPrice3: this.powerPrice3,
      powerPrice4: this.powerPrice4,
      powerPrice5: this.powerPrice5,
      powerPrice6: this.powerPrice6,
      fixedTermPrice: this.fixedTermPrice
    };
  }
}
