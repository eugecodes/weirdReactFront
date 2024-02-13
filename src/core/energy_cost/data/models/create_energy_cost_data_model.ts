import { Expose } from "class-transformer";
import { toJson } from "@/src/common/utils/transformers";
import type { CreateEnergyCostModel } from "@/src/core/energy_cost/domain/models/create_energy_cost_model";

export class CreateEnergyCostDataModel {
  @Expose() concept!: string;
  @Expose() amount!: number;

  fromDomain(domainObject: CreateEnergyCostModel) {
    this.concept = domainObject.concept;
    this.amount = domainObject.amount;
  }

  toJson() {
    return toJson(this);
  }
}
