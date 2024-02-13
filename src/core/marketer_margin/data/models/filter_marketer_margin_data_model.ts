import { fromOptionsToId, toJson } from "@/src/common/utils/transformers";
import { Expose, Transform } from "class-transformer";
import type { FilterMarketerMarginModel } from "@/src/core/marketer_margin/domain/models/filter_marketer_margin_model";
import type { Id, Option } from "@/src/common/utils/types";
import { CreateAtFilterDataModel } from "@/src/core/app/data/models/create_at_filter_data_model";

export class FiltersMarketerMarginDataModel extends CreateAtFilterDataModel {
  @Expose({ name: "rate__marketer_id" }) marketerId?: Id;
  @Expose({ name: "rate__id__in" })
  @Transform(fromOptionsToId)
  rate?: Option[];
  @Expose({ name: "rate__rate_type__id__in" })
  @Transform(fromOptionsToId)
  rateType?: Option[];
  @Expose({ name: "min_consumption__gte" }) minConsumption?: string;
  @Expose({ name: "max_consumption__lte" }) maxConsumption?: string;
  @Expose({ name: "min_margin__gte" }) minMargin?: string;
  @Expose({ name: "max_margin__lte" }) maxMargin?: string;
  @Expose({ name: "user__first_name__unaccent" })
  responsible!: string;

  fromDomain(domainObject: FilterMarketerMarginModel = {}) {
    if (domainObject.createdAt) {
      super.fromChild(domainObject.createdAt);
    }
    this.marketerId = domainObject.marketerId;
    this.rate = domainObject.rate;
    this.rateType = domainObject.rateType;
    this.minConsumption = domainObject.minConsume;
    this.maxConsumption = domainObject.maxConsume;
    this.minMargin = domainObject.minMargin;
    this.maxMargin = domainObject.maxMargin;
    this.responsible = domainObject.responsible || "";
  }

  toJson() {
    return toJson(this);
  }
}
