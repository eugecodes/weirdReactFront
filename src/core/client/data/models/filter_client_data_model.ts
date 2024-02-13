import { toJson } from "@/src/common/utils/transformers";
import { Expose } from "class-transformer";
import type { FilterClientModel } from "@/src/core/client/domain/models/filter_client_model";
import { CreateAtFilterDataModel } from "@/src/core/app/data/models/create_at_filter_data_model";
import type { StudyStatus } from "@/src/core/app/enums/study_status";
import type { Id } from "@/src/common/utils/types";
import type { ClientType } from "@/src/core/app/enums/client_type";

export class FiltersClientDataModel extends CreateAtFilterDataModel {
  @Expose()
  id?: Id;
  @Expose()
  cups?: string;
  @Expose({ name: "client_type" })
  clientType?: ClientType;
  @Expose({ name: "client_name__unaccent" })
  clientName?: string;
  @Expose({ name: "client_nif" })
  clientNif?: string;
  @Expose({ name: "current_marketer__unaccent" })
  marketer?: string;
  @Expose({ name: "suggested_rate__rate_name__unaccent" })
  selectedRate?: string;
  @Expose({ name: "current_rate_type__name__unaccent" })
  rateType?: string;
  @Expose()
  status?: StudyStatus;
  @Expose({ name: "created_at" })
  createdAt?: string;
  @Expose({ name: "user_creator__first_name__unaccent" })
  responsible?: string;

  fromDomain(domainObject: FilterClientModel = {}) {
    if (domainObject.createdAt) {
      super.fromChild(domainObject.createdAt);
    }
    this.id = domainObject.id;
    this.cups = domainObject.cups;
    this.clientType = domainObject.clientType;
    this.clientName = domainObject.clientName;
    this.clientNif = domainObject.clientNif;
    this.marketer = domainObject.marketer;
    this.selectedRate = domainObject.selectedRate;
    this.rateType = domainObject.rateType;
    this.status = domainObject.status;
    this.responsible = domainObject.responsible;
  }

  toJson() {
    return toJson(this);
  }
}
