import type { OrderData } from "@/src/core/app/data/models/order_data";
import { orderFromDomainToData } from "@/src/core/app/data/models/order_data";
import { Expose } from "class-transformer";
import type { SortSavingStudy } from "@/src/core/saving_study/domain/interfaces/sort_saving_study";
import { fromSortObjectToOrderQueryParam } from "@/src/common/utils";

export class SortSavingStudyDataModel {
  @Expose()
  id?: OrderData;
  @Expose()
  cups?: OrderData;
  @Expose({ name: "client_type" })
  clientType?: OrderData;
  @Expose({ name: "client_name" })
  clientName?: OrderData;
  @Expose({ name: "client_nif" })
  clientNif?: OrderData;
  @Expose({ name: "current_marketer" })
  marketer?: OrderData;
  @Expose({ name: "selected_rate" })
  selectedRate?: OrderData;
  @Expose({ name: "current_rate_type" })
  rateType?: OrderData;
  @Expose()
  status?: OrderData;
  @Expose({ name: "created_at" })
  createdAt?: OrderData;
  @Expose({ name: "user_creator" })
  responsible?: OrderData;

  fromDomain(domainObject: SortSavingStudy = {}) {
    this.id = orderFromDomainToData(domainObject.id);
    this.cups = orderFromDomainToData(domainObject.cups);
    this.clientType = orderFromDomainToData(domainObject.clientType);
    this.clientName = orderFromDomainToData(domainObject.clientName);
    this.clientNif = orderFromDomainToData(domainObject.clientNif);
    this.marketer = orderFromDomainToData(domainObject.marketer);
    this.selectedRate = orderFromDomainToData(domainObject.selectedRate);
    this.rateType = orderFromDomainToData(domainObject.rateType);
    this.status = orderFromDomainToData(domainObject.status);
    this.createdAt = orderFromDomainToData(domainObject.createdAt);
    this.responsible = orderFromDomainToData(domainObject.responsible);
    return this;
  }

  toString() {
    return fromSortObjectToOrderQueryParam(this);
  }
}
