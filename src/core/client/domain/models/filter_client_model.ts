import type { Id } from "@/src/common/utils/types";
import type { ClientType } from "@/src/core/app/enums/client_type";
import type { StudyStatus } from "@/src/core/app/enums/study_status";

export class FilterClientModel {
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
  enabled?: boolean;

  constructor(client: {
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
    enabled?: boolean;
  }) {
    this.id = client.id;
    this.cups = client.cups;
    this.clientType = client.clientType;
    this.clientName = client.clientName;
    this.clientNif = client.clientNif;
    this.marketer = client.marketer;
    this.selectedRate = client.selectedRate;
    this.rateType = client.rateType;
    this.status = client.status;
    this.createdAt = client.createdAt;
    this.responsible = client.responsible;
    this.enabled = client.enabled;
  }
}
