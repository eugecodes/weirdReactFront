import { Expose } from "class-transformer";
import type { CreateRateTypeModel } from "@/src/core/rate_type/domain/models/create_rate_type_model";
import { toJson } from "@/src/common/utils/transformers";
import type { EnergyTypes } from "@/src/core/app/enums/energy_types";

export class CreateRateTypeDataModel {
  @Expose() name!: string;
  @Expose({ name: "energy_type" }) energyType!: EnergyTypes;
  @Expose({ name: "min_power" }) minPower?: number;
  @Expose({ name: "max_power" }) maxPower?: number;

  fromDomain(domainObject: CreateRateTypeModel) {
    this.name = domainObject.name;
    this.energyType = domainObject.energyType;
    this.maxPower = domainObject.maxPower;
    this.minPower = domainObject.minPower;
  }

  toJson() {
    return toJson(this);
  }
}
