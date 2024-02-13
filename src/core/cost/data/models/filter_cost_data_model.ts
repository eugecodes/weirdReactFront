import { fromOptionsToId, toJson } from "@/src/common/utils/transformers";
import { Expose, Transform } from "class-transformer";
import type { FilterCostModel } from "@/src/core/cost/domain/models/filter_cost_model";
import { isBoolean } from "lodash";
import type { Id, Option } from "@/src/common/utils/types";
import type { ClientType } from "@/src/core/app/enums/client_type";
import type { CostType } from "@/src/core/app/enums/cost_type";
import { CreateAtFilterDataModel } from "@/src/core/app/data/models/create_at_filter_data_model";

export class FiltersCostDataModel extends CreateAtFilterDataModel {
  @Expose({ name: "rates__marketer_id" })
  marketerId?: Id;
  @Expose({ name: "name__unaccent" })
  name?: string;
  @Expose({ name: "client_types__contains" })
  clientType?: ClientType[];
  @Expose({ name: "rates__id__in" })
  @Transform(fromOptionsToId)
  rates?: Option[];
  @Expose({ name: "min_power__gte" })
  minPower?: string;
  @Expose({ name: "max_power__lte" })
  maxPower?: string;
  @Expose({ name: "quantity__gte" })
  quantity?: string;
  @Expose({ name: "type" })
  costType?: CostType;
  @Expose({ name: "is_active" }) isActive?: boolean;
  @Expose({ name: "user__first_name__unaccent" })
  responsible?: string;

  fromDomain(domainObject: FilterCostModel) {
    if (isBoolean(domainObject.enabled)) {
      this.isActive = domainObject.enabled;
    }
    if (domainObject.createdAt) {
      super.fromChild(domainObject.createdAt);
    }
    this.marketerId = domainObject.marketerId;
    this.name = domainObject.name;
    this.rates = domainObject?.rates;
    this.clientType = domainObject.clientTypes;
    this.minPower = domainObject.minPower;
    this.maxPower = domainObject.maxPower;
    this.quantity = domainObject.quantity;
    this.costType = domainObject.costType;
  }

  toJson() {
    return toJson(this);
  }
}
