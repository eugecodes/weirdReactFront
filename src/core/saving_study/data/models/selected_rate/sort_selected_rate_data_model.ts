import type { SortSelectedRate } from "@/src/core/saving_study/domain/models/selected_rate/sort_selected_rate";
import type { OrderData } from "@/src/core/app/data/models/order_data";
import { orderFromDomainToData } from "@/src/core/app/data/models/order_data";
import { fromSortObjectToOrderQueryParam } from "@/src/common/utils";
import { Expose } from "class-transformer";

export class SortSelectedRateDataModel {
  @Expose()
  id?: OrderData;
  @Expose({ name: "marketer_name" })
  marketerName?: OrderData;
  @Expose({ name: "rate_name" })
  rateName?: OrderData;
  @Expose({ name: "has_contractual_commitment" })
  hasContractualCommitment?: OrderData;
  @Expose()
  duration?: OrderData;
  @Expose()
  renewable?: OrderData;
  @Expose({ name: "net_metering" })
  netMetering?: OrderData;
  @Expose({ name: "surplus_price" })
  surplusPrice?: OrderData;
  @Expose({ name: "applied_profit_margin" })
  appliedProfitMargin?: OrderData;
  @Expose({ name: "final_cost" })
  finalCost?: OrderData;
  @Expose({ name: "theoretical_commission" })
  theoreticalCommission?: OrderData;
  @Expose({ name: "saving_relative" })
  savingRelative?: OrderData;
  @Expose({ name: "saving_absolute" })
  savingAbsolute?: OrderData;

  fromDomain(domainObject: SortSelectedRate = {}) {
    this.id = orderFromDomainToData(domainObject.id);
    this.marketerName = orderFromDomainToData(domainObject.marketerName);
    this.rateName = orderFromDomainToData(domainObject.rateName);
    this.hasContractualCommitment = orderFromDomainToData(domainObject.hasContractualCommitment);
    this.duration = orderFromDomainToData(domainObject.duration);
    this.renewable = orderFromDomainToData(domainObject.renewable);
    this.netMetering = orderFromDomainToData(domainObject.netMetering);
    this.surplusPrice = orderFromDomainToData(domainObject.surplusPrice);
    this.appliedProfitMargin = orderFromDomainToData(domainObject.appliedProfitMargin);
    this.finalCost = orderFromDomainToData(domainObject.finalCost);
    this.theoreticalCommission = orderFromDomainToData(domainObject.theoreticalCommission);
    this.savingRelative = orderFromDomainToData(domainObject.savingRelative);
    this.savingAbsolute = orderFromDomainToData(domainObject.savingAbsolute);
    return this;
  }

  toString() {
    return fromSortObjectToOrderQueryParam(this);
  }
}
