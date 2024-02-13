import type { Id } from "@/src/common/utils/types";
import type { PriceType } from "@/src/core/app/enums/price_type";
import type { BasicMarketerDataModel } from "@/src/core/marketer/data/models/basic_marketer_data_model";
import type { BasicRateTypeModel } from "@/src/core/rate_type/domain/models/basic_rate_type_model";

export class BasicRateModel {
  id: Id;
  name: string;
  rateType?: BasicRateTypeModel;
  marketerId?: Id;
  marketer?: BasicMarketerDataModel;
  priceType?: PriceType;

  constructor(rate: {
    id: Id;
    name: string;
    rateType?: BasicRateTypeModel;
    marketerId?: Id;
    marketer?: BasicMarketerDataModel;
    priceType?: PriceType;
  }) {
    this.id = rate.id;
    this.name = rate.name;
    this.rateType = rate.rateType;
    this.marketerId = rate.marketerId;
    this.marketer = rate.marketer;
  }
}
