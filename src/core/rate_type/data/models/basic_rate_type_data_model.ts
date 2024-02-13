import { toJson } from "@/src/common/utils/transformers";
import { Expose } from "class-transformer";
import { BasicRateTypeModel } from "@/src/core/rate_type/domain/models/basic_rate_type_model";
import type { EnergyTypes } from "@/src/core/app/enums/energy_types";

export class BasicRateTypeDataModel {
  @Expose() id!: number;
  @Expose() name!: string;
  @Expose({ name: "energy_type" }) energyType!: EnergyTypes;

  toDomain(): BasicRateTypeModel {
    return new BasicRateTypeModel({
      id: this.id,
      name: this.name,
      energyType: this.energyType
    });
  }

  fromDomain(domainObject: BasicRateTypeModel): BasicRateTypeDataModel {
    this.id = domainObject.id;
    this.name = domainObject.name;
    this.energyType = domainObject.energyType;

    return this;
  }

  toJson() {
    return toJson(this);
  }
}
