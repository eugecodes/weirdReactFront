import type { Id } from "@/src/common/utils/types";
import { Expose } from "class-transformer";
import { SelectedRateModel } from "@/src/core/saving_study/domain/models/selected_rate/selected_rate_model";

export class SelectedRateDataModel {
  @Expose()
  id!: Id;
  @Expose({ name: "rate_name" })
  name!: string;
  @Expose({ name: "final_cost" })
  finalCost?: number;
  @Expose({ name: "theoretical_commission" })
  theoreticalCommission?: number;
  @Expose({ name: "total_commission" })
  totalCommission?: number;
  @Expose({ name: "saving_relative" })
  savingRelative?: number;
  @Expose({ name: "saving_absolute" })
  savingAbsolute?: number;

  toDomain(): SelectedRateModel {
    return new SelectedRateModel({
      id: this.id,
      name: this.name,
      finalCost: this.finalCost,
      theoreticalCommission: this.theoreticalCommission,
      totalCommission: this.totalCommission,
      savingRelative: this.savingRelative,
      savingAbsolute: this.savingAbsolute
    });
  }

  fromDomain(domainObject: SelectedRateModel) {
    this.id = domainObject.id;
    this.name = domainObject.name;
    this.finalCost = domainObject.finalCost;
    this.theoreticalCommission = domainObject.theoreticalCommission;
    this.totalCommission = domainObject.totalCommission;
    this.savingRelative = domainObject.savingRelative;
    this.savingAbsolute = domainObject.savingAbsolute;
    return this;
  }
}
