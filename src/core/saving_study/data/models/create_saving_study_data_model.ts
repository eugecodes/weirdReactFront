import { Expose } from "class-transformer";
import type { CreateSavingStudyModel } from "@/src/core/saving_study/domain/models/create_saving_study_model";
import { toJson } from "@/src/common/utils/transformers";
import type { ClientType } from "@/src/core/app/enums/client_type";
import type { Id } from "@/src/common/utils/types";
import type { EnergyTypes } from "@/src/core/app/enums/energy_types";

export class CreateSavingStudyDataModel {
  @Expose()
  cups!: string;
  @Expose({ name: "client_type" })
  clientType!: ClientType;
  @Expose({ name: "client_name" })
  clientName?: string;
  @Expose({ name: "client_nif" })
  clientNif?: string;
  @Expose({ name: "current_rate_type_id" })
  rateType!: Id;
  @Expose({ name: "analyzed_days" })
  analyzedDays!: number;
  @Expose({ name: "consumption_p1" })
  consumption1?: number;
  @Expose({ name: "consumption_p2" })
  consumption2?: number;
  @Expose({ name: "consumption_p3" })
  consumption3?: number;
  @Expose({ name: "consumption_p4" })
  consumption4?: number;
  @Expose({ name: "consumption_p5" })
  consumption5?: number;
  @Expose({ name: "consumption_p6" })
  consumption6?: number;
  @Expose({ name: "annual_consumption" })
  anualConsumption?: number;
  @Expose({ name: "power_1" })
  power1?: number;
  @Expose({ name: "power_2" })
  power2?: number;
  @Expose({ name: "power_3" })
  power3?: number;
  @Expose({ name: "power_4" })
  power4?: number;
  @Expose({ name: "power_5" })
  power5?: number;
  @Expose({ name: "power_6" })
  power6?: number;
  @Expose({ name: "current_marketer" })
  marketer?: string;
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
  @Expose({ name: "energy_price_1" })
  energyPrice1!: number;
  @Expose({ name: "energy_price_2" })
  energyPrice2!: number;
  @Expose({ name: "energy_price_3" })
  energyPrice3?: number;
  @Expose({ name: "energy_price_4" })
  energyPrice4?: number;
  @Expose({ name: "energy_price_5" })
  energyPrice5?: number;
  @Expose({ name: "energy_price_6" })
  energyPrice6?: number;
  @Expose({ name: "fixed_price" })
  fixedPrice?: number;
  @Expose({ name: "other_cost_eur_month" })
  otherCostEurMonth?: number;
  @Expose({ name: "other_cost_kwh" })
  otherCostEurKwh?: number;
  @Expose({ name: "other_cost_percentage" })
  otherCostPercentage?: number;
  @Expose({ name: "energy_type" })
  energyType?: EnergyTypes;
  @Expose({ name: "is_existing_client" })
  isExistingClient?: boolean;
  @Expose({ name: "is_from_sips" })
  isFromSIPS?: boolean;
  @Expose({ name: "is_compare_conditions" })
  isCompareConditions?: boolean;

  fromDomain(domainObject: CreateSavingStudyModel) {
    this.cups = domainObject.cups;
    this.clientType = domainObject.clientType;
    this.clientName = domainObject.clientName;
    this.clientNif = domainObject.clientNif;
    this.rateType = domainObject.rateType?.id;
    this.analyzedDays = domainObject.analyzedDays;
    this.consumption1 = domainObject.consumption1;
    this.consumption2 = domainObject.consumption2;
    this.consumption3 = domainObject.consumption3;
    this.consumption4 = domainObject.consumption4;
    this.consumption5 = domainObject.consumption5;
    this.consumption6 = domainObject.consumption6;
    this.anualConsumption = domainObject.anualConsumption;
    this.power1 = domainObject.power1;
    this.power2 = domainObject.power2;
    this.power3 = domainObject.power3;
    this.power4 = domainObject.power4;
    this.power5 = domainObject.power5;
    this.power6 = domainObject.power6;
    this.marketer = domainObject.marketer;
    this.powerPrice1 = domainObject.powerPrice1;
    this.powerPrice2 = domainObject.powerPrice2;
    this.powerPrice3 = domainObject.powerPrice3;
    this.powerPrice4 = domainObject.powerPrice4;
    this.powerPrice5 = domainObject.powerPrice5;
    this.powerPrice6 = domainObject.powerPrice6;
    this.energyPrice1 = domainObject.energyPrice1;
    this.energyPrice2 = domainObject.energyPrice2;
    this.energyPrice3 = domainObject.energyPrice3;
    this.energyPrice4 = domainObject.energyPrice4;
    this.energyPrice5 = domainObject.energyPrice5;
    this.energyPrice6 = domainObject.energyPrice6;
    this.fixedPrice = domainObject.fixedPrice;
    this.otherCostEurMonth = domainObject.otherCostEurMonth;
    this.otherCostEurKwh = domainObject.otherCostEurKwh;
    this.otherCostPercentage = domainObject.otherCostPercentage;
    this.energyType = domainObject.energyType;
    this.isExistingClient = domainObject.isExistingClient;
    this.isFromSIPS = domainObject.isFromSIPS;
    this.isCompareConditions = domainObject.isCompareConditions;
  }

  toJson() {
    return toJson(this);
  }
}
