import type { OrderData } from "@/src/core/app/data/models/order_data";
import { orderFromDomainToData } from "@/src/core/app/data/models/order_data";
import { Expose } from "class-transformer";
import type { SortClient } from "@/src/core/client/domain/interfaces/sort_client";
import { fromSortObjectToOrderQueryParam } from "@/src/common/utils";

export class SortClientDataModel {
  @Expose() id?: OrderData;
  @Expose() alias?: OrderData;
  @Expose({ name: "client_type" }) clientType?: OrderData;
  @Expose({ name: "fiscal_name" }) fiscalName?: OrderData;
  @Expose({ name: "cif" }) cif?: OrderData;
  @Expose({ name: "created_at" }) createdAt?: OrderData;

  fromDomain(domainObject: SortClient = {}) {
    this.id = orderFromDomainToData(domainObject.id);
    this.alias = orderFromDomainToData(domainObject.alias);
    this.clientType = orderFromDomainToData(domainObject.clientType);
    this.fiscalName = orderFromDomainToData(domainObject.fiscalName);
    this.cif = orderFromDomainToData(domainObject.cif);
    this.createdAt = orderFromDomainToData(domainObject.createdAt);
    return this;
  }

  toString() {
    return fromSortObjectToOrderQueryParam(this);
  }
}
