import { fromDataDateStringToDomainDate } from "@/src/common/utils/dates";
import { toJson } from "@/src/common/utils/transformers";
import { Expose, Type } from "class-transformer";
import type { Id } from "@/src/common/utils/types";
import { BasicRateTypeDataModel } from "@/src/core/rate_type/data/models/basic_rate_type_data_model";
import type { StudyStatus } from "@/src/core/app/enums/study_status";
import { UserDataModel } from "@/src/core/user/data/models/user_data_model";
import type { ClientType } from "@/src/core/app/enums/client_type";
import { DetailSavingStudyModel } from "@/src/core/saving_study/domain/models/detail_saving_study_model";
import { DetailSelectedRateDataModel } from "./selected_rate/detail_selected_rate_data_model";
import type { EnergyTypes } from "@/src/core/app/enums/energy_types";

export class DetailSavingStudyDataModel {
  @Expose()
  id!: Id;
  @Expose()
  cups!: string;
  @Expose({ name: "energy_type" })
  energyType!: EnergyTypes;
  @Expose({ name: "client_type" })
  clientType!: ClientType;
  @Expose({ name: "client_name" })
  clientName?: string;
  @Expose({ name: "client_nif" })
  clientNif?: string;
  @Expose({ name: "current_marketer" })
  marketer?: string;
  @Expose({ name: "selected_suggested_rate" })
  @Type(() => DetailSelectedRateDataModel)
  selectedRate?: DetailSelectedRateDataModel;
  @Expose({ name: "final_cost" })
  finalCost?: number;
  @Expose({ name: "theoretical_commission" })
  theoreticalCommission?: number;
  @Expose({ name: "saving_relative" })
  savingRelative?: number;
  @Expose({ name: "saving_absolute" })
  savingAbsolute?: number;
  @Expose({ name: "analyzed_days" })
  analyzedDays?: number;
  @Expose({ name: "current_rate_type" })
  @Type(() => BasicRateTypeDataModel)
  rateType?: BasicRateTypeDataModel;
  @Expose()
  status!: StudyStatus;
  @Expose({ name: "create_at" })
  createdAt!: string;
  @Expose({ name: "user_creator" })
  @Type(() => UserDataModel)
  responsible!: UserDataModel;
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
  @Expose({ name: "is_existing_client" })
  isExistingClient!: boolean;
  @Expose({ name: "is_from_sips" })
  isFromSIPS!: boolean;
  @Expose({ name: "is_compare_conditions" })
  isCompareConditions!: boolean;

  toDomain(): DetailSavingStudyModel {
    return new DetailSavingStudyModel({
      id: this.id,
      cups: this.cups,
      energyType: this.energyType,
      clientType: this.clientType,
      clientName: this.clientName,
      clientNif: this.clientNif,
      marketer: this.marketer,
      selectedRate: this.selectedRate?.toDomain(),
      finalCost: this.finalCost,
      theoreticalCommission: this.theoreticalCommission,
      savingRelative: this.savingRelative,
      savingAbsolute: this.savingAbsolute,
      rateType: this.rateType?.toDomain(),
      status: this.status,
      createdAt: fromDataDateStringToDomainDate(this.createdAt),
      responsible: this.responsible?.toDomain(),
      consumption1: this.consumption1,
      consumption2: this.consumption2,
      consumption3: this.consumption3,
      consumption4: this.consumption4,
      consumption5: this.consumption5,
      consumption6: this.consumption6,
      anualConsumption: this.anualConsumption,
      analyzedDays: this.analyzedDays,
      powerPrice1: this.powerPrice1,
      powerPrice2: this.powerPrice2,
      powerPrice3: this.powerPrice3,
      powerPrice4: this.powerPrice4,
      powerPrice5: this.powerPrice5,
      powerPrice6: this.powerPrice6,
      power1: this.power1,
      power2: this.power2,
      power3: this.power3,
      power4: this.power4,
      power5: this.power5,
      power6: this.power6,
      energyPrice1: this.energyPrice1,
      energyPrice2: this.energyPrice2,
      energyPrice3: this.energyPrice3,
      energyPrice4: this.energyPrice4,
      energyPrice5: this.energyPrice5,
      energyPrice6: this.energyPrice6,
      fixedPrice: this.fixedPrice,
      otherCostEurMonth: this.otherCostEurMonth,
      otherCostEurKwh: this.otherCostEurKwh,
      otherCostPercentage: this.otherCostPercentage,
      isExistingClient: this.isExistingClient,
      isFromSIPS: this.isFromSIPS,
      isCompareConditions: this.isCompareConditions
    });
  }

  toJson() {
    return toJson(this);
  }
}
