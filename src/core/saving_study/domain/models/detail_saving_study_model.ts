import type { Id } from "@/src/common/utils/types";
import type { ClientType } from "@/src/core/app/enums/client_type";
import type { StudyStatus } from "@/src/core/app/enums/study_status";
import type { BasicRateTypeModel } from "@/src/core/rate_type/domain/models/basic_rate_type_model";
import type { UserModel } from "@/src/core/user/domain/models/user_model";
import type { ConstructorType } from "@/src/common/interfaces/constructor_type";
import type { DetailSelectedRateModel } from "./selected_rate/detail_selected_rate_model";
import type { EnergyTypes } from "@/src/core/app/enums/energy_types";

export class DetailSavingStudyModel {
  id: Id;
  cups: string;
  energyType: EnergyTypes;
  clientType: ClientType;
  clientName?: string;
  clientNif?: string;
  marketer?: string;
  selectedRate?: DetailSelectedRateModel;
  finalCost?: number;
  theoreticalCommission?: number;
  savingRelative?: number;
  savingAbsolute?: number;
  rateType?: BasicRateTypeModel;
  status: StudyStatus;
  createdAt: string;
  responsible?: UserModel;
  consumption1?: number;
  consumption2?: number;
  consumption3?: number;
  consumption4?: number;
  consumption5?: number;
  consumption6?: number;
  anualConsumption?: number;
  analyzedDays?: number;
  power1?: number;
  power2?: number;
  power3?: number;
  power4?: number;
  power5?: number;
  power6?: number;
  powerPrice1?: number;
  powerPrice2?: number;
  powerPrice3?: number;
  powerPrice4?: number;
  powerPrice5?: number;
  powerPrice6?: number;
  energyPrice1!: number;
  energyPrice2!: number;
  energyPrice3?: number;
  energyPrice4?: number;
  energyPrice5?: number;
  energyPrice6?: number;
  fixedPrice?: number;
  otherCostEurMonth?: number;
  otherCostEurKwh?: number;
  otherCostPercentage?: number;
  isExistingClient: boolean;
  isFromSIPS: boolean;
  isCompareConditions: boolean;

  constructor(savingStudy: ConstructorType<DetailSavingStudyModel>) {
    this.id = savingStudy.id;
    this.cups = savingStudy.cups;
    this.energyType = savingStudy.energyType;
    this.clientType = savingStudy.clientType;
    this.clientName = savingStudy.clientName;
    this.clientNif = savingStudy.clientNif;
    this.marketer = savingStudy.marketer;
    this.selectedRate = savingStudy.selectedRate;
    this.finalCost = savingStudy.finalCost;
    this.theoreticalCommission = savingStudy.theoreticalCommission;
    this.savingRelative = savingStudy.savingRelative;
    this.savingAbsolute = savingStudy.savingAbsolute;
    this.rateType = savingStudy.rateType;
    this.status = savingStudy.status;
    this.createdAt = savingStudy.createdAt;
    this.responsible = savingStudy.responsible;
    this.consumption1 = savingStudy.consumption1;
    this.consumption2 = savingStudy.consumption2;
    this.consumption3 = savingStudy.consumption3;
    this.consumption4 = savingStudy.consumption4;
    this.consumption5 = savingStudy.consumption5;
    this.consumption6 = savingStudy.consumption6;
    this.anualConsumption = savingStudy.anualConsumption;
    this.analyzedDays = savingStudy.analyzedDays;
    this.power1 = savingStudy.power1;
    this.power2 = savingStudy.power2;
    this.power3 = savingStudy.power3;
    this.power4 = savingStudy.power4;
    this.power5 = savingStudy.power5;
    this.power6 = savingStudy.power6;
    this.powerPrice1 = savingStudy.powerPrice1;
    this.powerPrice2 = savingStudy.powerPrice2;
    this.powerPrice3 = savingStudy.powerPrice3;
    this.powerPrice4 = savingStudy.powerPrice4;
    this.powerPrice5 = savingStudy.powerPrice5;
    this.powerPrice6 = savingStudy.powerPrice6;
    this.energyPrice1 = savingStudy.energyPrice1;
    this.energyPrice2 = savingStudy.energyPrice2;
    this.energyPrice3 = savingStudy.energyPrice3;
    this.energyPrice4 = savingStudy.energyPrice4;
    this.energyPrice5 = savingStudy.energyPrice5;
    this.energyPrice6 = savingStudy.energyPrice6;
    this.fixedPrice = savingStudy.fixedPrice;
    this.otherCostEurMonth = savingStudy.otherCostEurMonth;
    this.otherCostEurKwh = savingStudy.otherCostEurKwh;
    this.otherCostPercentage = savingStudy.otherCostPercentage;
    this.isExistingClient = savingStudy.isExistingClient;
    this.isFromSIPS = savingStudy.isFromSIPS;
    this.isCompareConditions = savingStudy.isCompareConditions;
  }

  creationData() {
    return {
      createdAt: this.createdAt,
      createdBy: this.responsible?.name || ""
    };
  }
}
