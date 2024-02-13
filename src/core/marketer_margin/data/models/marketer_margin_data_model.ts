import { fromDataDateStringToDomainDate } from "@/src/common/utils/dates";
import { toJson } from "@/src/common/utils/transformers";
import { Expose, Type } from "class-transformer";
import { MarketerMarginModel } from "@/src/core/marketer_margin/domain/models/marketer_margin_model";
import type { DataModel } from "@/src/common/interfaces/data_model";
import type { MarginType } from "@/src/core/app/enums/margin_type";
import { BasicRateDataModel } from "@/src/core/rate/data/models/basic_rate_data_model";
import { BasicRateTypeDataModel } from "@/src/core/rate_type/data/models/basic_rate_type_data_model";
import type { Id } from "@/src/common/utils/types";
import { fromEuroKwhToEuroMwh, fromKwhToMwh } from "@/src/common/utils/conversion_units";

export class MarketerMarginDataModel implements DataModel<MarketerMarginModel> {
  @Expose()
  id!: Id;
  @Expose({ name: "marketer_id" })
  marketerId?: Id;
  @Expose({ name: "rate" })
  @Type(() => BasicRateDataModel)
  rate?: BasicRateDataModel;
  @Expose()
  type!: MarginType;
  @Expose({ name: "rate_type" })
  @Type(() => BasicRateTypeDataModel)
  rateType?: BasicRateTypeDataModel;
  @Expose({ name: "min_consumption" })
  minConsumption?: number;
  @Expose({ name: "max_consumption" })
  maxConsumption?: number;
  @Expose({ name: "min_margin" })
  minMargin!: number;
  @Expose({ name: "max_margin" })
  maxMargin!: number;
  @Expose({ name: "create_at" })
  createdAt!: string;

  toDomain(): MarketerMarginModel {
    return new MarketerMarginModel({
      id: this.id,
      marketerId: this.rate?.marketerId,
      rate: this.rate?.toDomain(),
      type: this.type,
      rateType: this.rate?.rateType?.toDomain(),
      minConsume: fromKwhToMwh(this.minConsumption),
      maxConsume: fromKwhToMwh(this.maxConsumption),
      minMargin: fromEuroKwhToEuroMwh(this.minMargin),
      maxMargin: fromEuroKwhToEuroMwh(this.maxMargin),
      createdAt: fromDataDateStringToDomainDate(this.createdAt)
    });
  }

  toJson() {
    return toJson(this);
  }
}
