import { toJson } from "@/src/common/utils/transformers";
import { Expose, Type } from "class-transformer";
import { BasicRateModel } from "@/src/core/rate/domain/models/basic_rate_model";
import { BasicRateTypeDataModel } from "@/src/core/rate_type/data/models/basic_rate_type_data_model";
import type { Id } from "@/src/common/utils/types";
import { BasicMarketerDataModel } from "@/src/core/marketer/data/models/basic_marketer_data_model";
import type { PriceType } from "@/src/core/app/enums/price_type";

export class BasicRateDataModel {
  @Expose() id!: number;
  @Expose() name!: string;
  @Expose({ name: "rate_type" })
  @Type(() => BasicRateTypeDataModel)
  rateType?: BasicRateTypeDataModel;
  @Expose({ name: "price_type" }) priceType?: PriceType;
  @Expose({ name: "marketer_id" }) marketerId?: Id;
  @Expose()
  @Type(() => BasicMarketerDataModel)
  marketer?: BasicMarketerDataModel;

  toDomain(): BasicRateModel {
    return new BasicRateModel({
      id: this.id,
      name: this.name,
      rateType: this.rateType,
      marketerId: this.marketerId,
      priceType: this.priceType,
      marketer: this.marketer
    });
  }

  fromDomain(domainObject: BasicRateModel) {
    this.id = domainObject.id;
    this.name = domainObject.name;
    this.priceType = domainObject.priceType;
    this.rateType = domainObject.rateType ? new BasicRateTypeDataModel().fromDomain(domainObject.rateType) : undefined;
    this.marketerId = domainObject.marketerId;
    this.marketer = domainObject.marketer ? new BasicMarketerDataModel().fromDomain(domainObject.marketer) : undefined;
  }

  toJson() {
    return toJson(this);
  }
}
