import { toJson } from "@/src/common/utils/transformers";
import { Expose } from "class-transformer";
import type { FilterEnergyCostModel } from "@/src/core/energy_cost/domain/models/filter_energy_cost_model";
import { isBoolean } from "lodash";
import { CreateAtFilterDataModel } from "@/src/core/app/data/models/create_at_filter_data_model";

export class FiltersEnergyCostDataModel extends CreateAtFilterDataModel {
  @Expose({ name: "concept__unaccent" }) concept?: string;
  @Expose({ name: "amount__gte" }) minAmount?: string;
  @Expose({ name: "amount__lte" }) maxAmount?: string;
  @Expose({ name: "is_active" }) isActive?: boolean;
  @Expose({ name: "user__first_name__unaccent" })
  responsible!: string;

  fromDomain(domainObject: FilterEnergyCostModel) {
    if (isBoolean(domainObject.enabled)) {
      this.isActive = domainObject.enabled;
    }
    if (domainObject.createdAt) {
      super.fromChild(domainObject.createdAt);
    }
    this.minAmount = domainObject.amount;
    this.concept = domainObject.concept;
    this.responsible = domainObject.responsible || "";
  }

  toJson() {
    return toJson(this);
  }
}
