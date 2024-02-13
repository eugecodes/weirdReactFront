import { fromDataDateStringToDomainDate } from "@/src/common/utils/dates";
import { toJson } from "@/src/common/utils/transformers";
import { Expose, Type } from "class-transformer";
import { UserDataModel } from "@/src/core/user/data/models/user_data_model";
import type { DataModel } from "@/src/common/interfaces/data_model";
import { RateModel } from "@/src/core/rate/domain/models/rate_model";
import type { Id } from "@/src/common/utils/types";
import type { PriceType } from "@/src/core/app/enums/price_type";
import type { ClientType } from "@/src/core/app/enums/client_type";
import { BasicRateTypeDataModel } from "@/src/core/rate_type/data/models/basic_rate_type_data_model";
import { BasicMarketerDataModel } from "@/src/core/marketer/data/models/basic_marketer_data_model";
import { fromKwhToMwh } from "@/src/common/utils/conversion_units";

export class RateDataModel implements DataModel<RateModel> {
  @Expose()
  id!: Id;
  @Expose({ name: "marketer" })
  @Type(() => BasicMarketerDataModel)
  marketer!: BasicMarketerDataModel;
  @Expose()
  name!: string;
  @Expose({ name: "price_type" })
  priceType!: PriceType;
  @Expose({ name: "client_types" })
  clientTypes!: ClientType[];
  @Expose({ name: "rate_type" })
  @Type(() => BasicRateTypeDataModel)
  rateType!: BasicRateTypeDataModel;
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
  @Expose({ name: "is_active" })
  isActive!: boolean;
  @Expose({ name: "create_at" })
  createdAt!: string;
  @Expose({ name: "user" })
  @Type(() => UserDataModel)
  responsible?: UserDataModel;

  toDomain(): RateModel {
    return new RateModel({
      id: this.id,
      marketer: this.marketer?.toDomain(),
      name: this.name,
      priceType: this.priceType,
      clientTypes: this.clientTypes,
      rateType: this.rateType,
      permanency: this.permanency,
      length: this.length,
      isFullRenewable: this.isFullRenewable,
      compensationSurplus: this.compensationSurplus,
      compensationSurplusValue: this.compensationSurplusValue,
      minPower: this.minPower,
      maxPower: this.maxPower,
      minConsumption: fromKwhToMwh(this.minConsumption),
      maxConsumption: fromKwhToMwh(this.maxConsumption),
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
      fixedTermPrice: this.fixedTermPrice,
      enabled: this.isActive,
      createdAt: fromDataDateStringToDomainDate(this.createdAt),
      responsible: this.responsible?.toDomain()
    });
  }

  fromDomain(domainObject: RateModel) {
    this.id = domainObject.id;
    this.marketer = new BasicMarketerDataModel().fromDomain(domainObject.marketer);
    this.name = domainObject.name;
    this.priceType = domainObject.priceType;
    this.clientTypes = domainObject.clientTypes;
    this.permanency = domainObject.permanency;
    this.length = domainObject.length;
    this.isFullRenewable = domainObject.isFullRenewable;
    this.compensationSurplus = domainObject.compensationSurplus;
    this.compensationSurplusValue = domainObject.compensationSurplusValue;
    this.minPower = domainObject.minPower;
    this.maxPower = domainObject.maxPower;
    this.minConsumption = domainObject.minConsumption;
    this.maxConsumption = domainObject.maxConsumption;
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
    this.isActive = domainObject.enabled;
    this.createdAt = domainObject.createdAt;
  }

  toJson() {
    return toJson(this);
  }
}
