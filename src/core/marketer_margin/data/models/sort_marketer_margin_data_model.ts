import type { OrderData } from "@/src/core/app/data/models/order_data";
import { orderFromDomainToData } from "@/src/core/app/data/models/order_data";
import { Expose } from "class-transformer";
import type { SortMarketerMargin } from "@/src/core/marketer_margin/domain/interfaces/sort_marketer_margin";
import { fromSortObjectToOrderQueryParam } from "@/src/common/utils";

export class SortMarketerMarginDataModel {
  @Expose({ name: "rate__name" }) rate?: OrderData;
  @Expose() type?: OrderData;
  @Expose({ name: "rate__rate_type__name" }) rateType?: OrderData;
  @Expose({ name: "min_consumption" }) minConsume?: OrderData;
  @Expose({ name: "max_consumption" }) maxConsume?: OrderData;
  @Expose({ name: "min_margin" }) minMargin?: OrderData;
  @Expose({ name: "max_margin" }) maxMargin?: OrderData;
  @Expose({ name: "create_at" }) createdAt?: OrderData;
  @Expose({ name: "user__first_name" }) responsible?: OrderData;

  fromDomain(domainObject: SortMarketerMargin = {}) {
    this.rate = orderFromDomainToData(domainObject.rate);
    this.type = orderFromDomainToData(domainObject.type);
    this.rateType = orderFromDomainToData(domainObject.rateType);
    this.minConsume = orderFromDomainToData(domainObject.minConsume);
    this.maxConsume = orderFromDomainToData(domainObject.maxConsume);
    this.minMargin = orderFromDomainToData(domainObject.minMargin);
    this.maxMargin = orderFromDomainToData(domainObject.maxMargin);
    this.createdAt = orderFromDomainToData(domainObject.createdAt);
    this.responsible = orderFromDomainToData(domainObject.responsible);
  }

  toString() {
    return fromSortObjectToOrderQueryParam(this);
  }
}
