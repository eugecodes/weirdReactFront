import { Expose } from "class-transformer";
import type { CreateMarketerMarginModel } from "@/src/core/marketer_margin/domain/models/create_marketer_margin_model";
import { toJson } from "@/src/common/utils/transformers";
import type { Id } from "@/src/common/utils/types";
import type { MarginType } from "@/src/core/app/enums/margin_type";
import { fromEuroMwhToEuroKwh, fromMwhTokWh } from "@/src/common/utils/conversion_units";

export class CreateMarketerMarginDataModel {
  @Expose({ name: "marketer_id" })
  marketerId!: Id;
  @Expose({ name: "rate_id" })
  rate!: Id;
  @Expose()
  type!: MarginType;
  @Expose({ name: "rate_type_id" })
  rateType?: Id;
  @Expose({ name: "min_consumption" })
  minConsumption?: number;
  @Expose({ name: "max_consumption" })
  maxConsumption?: number;
  @Expose({ name: "min_margin" })
  minMargin!: number;
  @Expose({ name: "max_margin" })
  maxMargin!: number;

  fromDomain(domainObject: CreateMarketerMarginModel) {
    this.marketerId = domainObject.marketerId;
    this.rate = domainObject.rate.id;
    this.type = domainObject.type;
    this.rateType = domainObject.rateType?.id;
    this.minConsumption = fromMwhTokWh(domainObject.minConsume);
    this.maxConsumption = fromMwhTokWh(domainObject.maxConsume);
    this.minMargin = fromEuroMwhToEuroKwh(domainObject.minMargin);
    this.maxMargin = fromEuroMwhToEuroKwh(domainObject.maxMargin);
  }

  toJson() {
    return toJson(this);
  }
}
