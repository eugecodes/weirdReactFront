import type { PatchSupplyPointModel } from "@/src/core/supply_point/domain/models/patch_supply_point_model";
import { toJson } from "@/src/common/utils/transformers";

export class PatchSupplyPointDataModel {
  fromDomain(domainObject: Partial<PatchSupplyPointModel>) {
    console.log(domainObject);
  }

  toJson() {
    return toJson(this);
  }
}
