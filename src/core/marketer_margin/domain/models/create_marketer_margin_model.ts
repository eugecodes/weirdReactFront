import type { Id, Option } from "@/src/common/utils/types";
import type { MarginType } from "@/src/core/app/enums/margin_type";

export class CreateMarketerMarginModel {
  marketerId: Id;
  rate: Option;
  type: MarginType;
  rateType?: Option;
  minConsume?: number;
  maxConsume?: number;
  minMargin: number;
  maxMargin: number;

  constructor(marketerMargin: {
    marketerId: Id;
    rate: Option;
    type: MarginType;
    rateType?: Option;
    minConsume?: number;
    maxConsume?: number;
    minMargin: number;
    maxMargin: number;
  }) {
    this.marketerId = marketerMargin.marketerId;
    this.rate = marketerMargin.rate;
    this.type = marketerMargin.type;
    this.rateType = marketerMargin.rateType;
    this.minConsume = marketerMargin.minConsume;
    this.maxConsume = marketerMargin.maxConsume;
    this.minMargin = marketerMargin.minMargin;
    this.maxMargin = marketerMargin.maxMargin;
  }
}
