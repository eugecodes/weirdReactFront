import type { Id } from "@/src/common/utils/types";
import type { ClientType } from "@/src/core/app/enums/client_type";
import type { StudyStatus } from "@/src/core/app/enums/study_status";

export class FilterSavingStudyModel {
  id?: Id;
  cups?: string;
  clientType?: ClientType;
  clientName?: string;
  clientNif?: string;
  marketer?: string;
  selectedRate?: string;
  rateType?: string;
  status?: StudyStatus;
  createdAt?: string;
  responsible?: string;

  constructor(savingStudy: {
    id?: Id;
    cups?: string;
    clientType?: ClientType;
    clientName?: string;
    clientNif?: string;
    marketer?: string;
    selectedRate?: string;
    rateType?: string;
    status?: StudyStatus;
    createdAt?: string;
    responsible?: string;
  }) {
    this.id = savingStudy.id;
    this.cups = savingStudy.cups;
    this.clientType = savingStudy.clientType;
    this.clientName = savingStudy.clientName;
    this.clientNif = savingStudy.clientNif;
    this.marketer = savingStudy.marketer;
    this.selectedRate = savingStudy.selectedRate;
    this.rateType = savingStudy.rateType;
    this.status = savingStudy.status;
    this.createdAt = savingStudy.createdAt;
    this.responsible = savingStudy.responsible;
  }
}
