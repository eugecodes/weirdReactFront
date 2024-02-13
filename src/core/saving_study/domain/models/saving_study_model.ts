import type { Id } from "@/src/common/utils/types";
import type { ClientType } from "@/src/core/app/enums/client_type";
import type { StudyStatus } from "@/src/core/app/enums/study_status";
import type { BasicRateTypeModel } from "@/src/core/rate_type/domain/models/basic_rate_type_model";
import type { UserModel } from "@/src/core/user/domain/models/user_model";
import type { SelectedRateModel } from "./selected_rate/selected_rate_model";
import type { ConstructorType } from "@/src/common/interfaces/constructor_type";

export class SavingStudyModel {
  id: Id;
  cups: string;
  clientType: ClientType;
  clientName?: string;
  clientNif?: string;
  marketer?: string;
  selectedRate?: SelectedRateModel;
  finalCost?: number;
  totalCommission?: number;
  savingRelative?: number;
  savingAbsolute?: number;
  rateType?: BasicRateTypeModel;
  status: StudyStatus;
  createdAt: string;
  responsible?: UserModel;

  constructor(savingStudy: ConstructorType<SavingStudyModel>) {
    this.id = savingStudy.id;
    this.cups = savingStudy.cups;
    this.clientType = savingStudy.clientType;
    this.clientName = savingStudy.clientName;
    this.clientNif = savingStudy.clientNif;
    this.marketer = savingStudy.marketer;
    this.selectedRate = savingStudy.selectedRate;
    this.finalCost = savingStudy.finalCost;
    this.totalCommission = savingStudy.totalCommission;
    this.savingRelative = savingStudy.savingRelative;
    this.savingAbsolute = savingStudy.savingAbsolute;
    this.rateType = savingStudy.rateType;
    this.status = savingStudy.status;
    this.createdAt = savingStudy.createdAt;
    this.responsible = savingStudy.responsible;
  }

  creationData() {
    return {
      createdAt: this.createdAt,
      createdBy: this.responsible?.name || ""
    };
  }
}
