import { Expose } from "class-transformer";
import type { CreateRateModel } from "@/src/core/rate/domain/models/create_rate_model";
import { toJson } from "@/src/common/utils/transformers";
import type { PriceType } from "@/src/core/app/enums/price_type";
import type { ClientType } from "@/src/core/app/enums/client_type";
import type { Id } from "@/src/common/utils/types";
import type { EnergyTypes } from "@/src/core/app/enums/energy_types";
import { fromMwhTokWh } from "@/src/common/utils/conversion_units";

export class CreateRateDataModel {
  @Expose({ name: "marketer_id" })
  marketerId!: Id;
  @Expose()
  name!: string;
  @Expose({ name: "energy_type" })
  energyType!: EnergyTypes;
  @Expose({ name: "price_type" })
  priceType!: PriceType;
  @Expose({ name: "client_types" })
  clientTypes!: ClientType[];
  @Expose({ name: "rate_type_id" })
  rateType!: Id;
  @Expose()
  permanency!: boolean;
  @Expose()
  length!: number;
  @Expose({ name: "is_full_renewable" })
  isFullRenewable?: boolean;
  @Expose({ name: "compensation_surplus" })
  compensationSurplus?: boolean;
  @Expose({ name: "compensation_surplus_value" })
  compensationSurplusValue?: number;
  @Expose({ name: "min_power" })
  minPower?: number;
  @Expose({ name: "max_power" })
  maxPower?: number;
  @Expose({ name: "min_consumption" })
  minConsumption?: number;
  @Expose({ name: "max_consumption" })
  maxConsumption?: number;
  @Expose({ name: "energy_price_1" })
  energyPrice1?: number;
  @Expose({ name: "energy_price_2" })
  energyPrice2?: number;
  @Expose({ name: "energy_price_3" })
  energyPrice3?: number;
  @Expose({ name: "energy_price_4" })
  energyPrice4?: number;
  @Expose({ name: "energy_price_5" })
  energyPrice5?: number;
  @Expose({ name: "energy_price_6" })
  energyPrice6?: number;
  @Expose({ name: "power_price_1" })
  powerPrice1?: number;
  @Expose({ name: "power_price_2" })
  powerPrice2?: number;
  @Expose({ name: "power_price_3" })
  powerPrice3?: number;
  @Expose({ name: "power_price_4" })
  powerPrice4?: number;
  @Expose({ name: "power_price_5" })
  powerPrice5?: number;
  @Expose({ name: "power_price_6" })
  powerPrice6?: number;
  @Expose({ name: "fixed_term_price" })
  fixedTermPrice?: number;

  fromDomain(domainObject: CreateRateModel) {
    this.marketerId = domainObject.marketer?.id;
    this.name = domainObject.name;
    this.energyType = domainObject.energyType;
    this.priceType = domainObject.priceType;
    this.clientTypes = domainObject.clientTypes;
    this.rateType = domainObject.rateType.id;
    this.permanency = domainObject.permanency;
    this.length = Number(domainObject.length);
    this.isFullRenewable = domainObject.isFullRenewable;
    this.compensationSurplus = domainObject.compensationSurplus;
    this.compensationSurplusValue = domainObject.compensationSurplusValue;
    this.minPower = domainObject.minPower;
    this.maxPower = domainObject.maxPower;
    this.minConsumption = fromMwhTokWh(domainObject.minConsumption);
    this.maxConsumption = fromMwhTokWh(domainObject.maxConsumption);
    this.energyPrice1 = domainObject.energyPrice1;
    this.energyPrice2 = domainObject.energyPrice2;
    this.energyPrice3 = domainObject.energyPrice3;
    this.energyPrice4 = domainObject.energyPrice4;
    this.energyPrice5 = domainObject.energyPrice5;
    this.energyPrice6 = domainObject.energyPrice6;
    this.powerPrice1 = domainObject.powerPrice1;
    this.powerPrice2 = domainObject.powerPrice2;
    this.powerPrice3 = domainObject.powerPrice3;
    this.powerPrice4 = domainObject.powerPrice4;
    this.powerPrice5 = domainObject.powerPrice5;
    this.powerPrice6 = domainObject.powerPrice6;
    this.fixedTermPrice = domainObject.fixedTermPrice;
  }

  toJson() {
    return toJson(this);
  }
}
