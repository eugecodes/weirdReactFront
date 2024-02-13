import { Expose } from "class-transformer";
import type { FilterSelectedRateModel } from "@/src/core/saving_study/domain/models/selected_rate/filter_selected_rate_model";
import { toJson } from "@/src/common/utils/transformers";

export class FilterSelectedRateDataModel {
  @Expose({ name: "marketer_name__unaccent" })
  marketerName?: string;
  @Expose({ name: "rate_name__unaccent" })
  rateName?: string;
  @Expose({ name: "has_contractual_commitment" })
  hasContractualCommitment?: boolean;
  @Expose({ name: "is_full_renewable" })
  renewable?: boolean;
  @Expose({ name: "has_net_metering" })
  netMetering?: boolean;

  fromDomain(domainObject: FilterSelectedRateModel = {}) {
    this.marketerName = domainObject.marketerName;
    this.rateName = domainObject.rateName;
    this.hasContractualCommitment = domainObject.hasContractualCommitment;
    this.renewable = domainObject.renewable;
    this.netMetering = domainObject.netMetering;
  }

  toJson() {
    return toJson(this);
  }
}
