import type { Id, Option } from "@/src/common/utils/types";

export class FilterMarketerMarginModel {
  marketerId?: Id;
  rate?: Option[];
  rateType?: Option[];
  minConsume?: string;
  maxConsume?: string;
  minMargin?: string;
  maxMargin?: string;
  createdAt?: string;
  responsible?: string;

  constructor(marketerMargin: {
    rate: Option[];
    rateType: Option[];
    minConsume?: string;
    maxConsume?: string;
    minMargin?: string;
    maxMargin?: string;
    createdAt?: string;
    responsible?: string;
  }) {
    this.rate = marketerMargin.rate;
    this.rateType = marketerMargin.rateType;
    this.minConsume = marketerMargin.minConsume;
    this.maxConsume = marketerMargin.maxConsume;
    this.minMargin = marketerMargin.minMargin;
    this.maxMargin = marketerMargin.maxMargin;
    this.createdAt = marketerMargin.createdAt;
    this.responsible = marketerMargin.responsible;
  }
}
