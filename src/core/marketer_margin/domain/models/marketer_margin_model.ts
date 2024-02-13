import type { Id } from "@/src/common/utils/types";
import type { MarginType } from "@/src/core/app/enums/margin_type";
import type { BasicRateModel } from "@/src/core/rate/domain/models/basic_rate_model";
import type { BasicRateTypeModel } from "@/src/core/rate_type/domain/models/basic_rate_type_model";

export class MarketerMarginModel {
  id: Id;
  marketerId?: Id;
  rate?: BasicRateModel;
  type: MarginType;
  rateType?: BasicRateTypeModel;
  minConsume?: number;
  maxConsume?: number;
  minMargin: number;
  maxMargin: number;
  createdAt: string;

  constructor(marketerMargin: {
    id: Id;
    marketerId?: Id;
    rate?: BasicRateModel;
    type: MarginType;
    rateType?: BasicRateTypeModel;
    minConsume?: number;
    maxConsume?: number;
    minMargin: number;
    maxMargin: number;
    createdAt: string;
  }) {
    this.id = marketerMargin.id;
    this.marketerId = marketerMargin.marketerId;
    this.rate = marketerMargin.rate;
    this.type = marketerMargin.type;
    this.rateType = marketerMargin.rateType;
    this.minConsume = marketerMargin.minConsume;
    this.maxConsume = marketerMargin.maxConsume;
    this.minMargin = marketerMargin.minMargin;
    this.maxMargin = marketerMargin.maxMargin;
    this.createdAt = marketerMargin.createdAt;
  }

  creationData() {
    return {
      createdAt: this.createdAt,
      createdBy: ""
    };
  }
}
