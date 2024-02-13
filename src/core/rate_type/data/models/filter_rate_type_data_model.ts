import { toJson } from "@/src/common/utils/transformers";
import { Expose } from "class-transformer";
import type { FilterRateTypeModel } from "@/src/core/rate_type/domain/models/filter_rate_type_model";
import { isBoolean } from "lodash";
import type { EnergyTypes } from "@/src/core/app/enums/energy_types";
import { CreateAtFilterDataModel } from "@/src/core/app/data/models/create_at_filter_data_model";

export class FiltersRateTypeDataModel extends CreateAtFilterDataModel {
  @Expose({ name: "name__unaccent" }) name!: string;
  @Expose({ name: "energy_type" }) energyType?: EnergyTypes;
  @Expose({ name: "max_power__lte" }) maxPower?: string;
  @Expose({ name: "min_power__gte" }) minPower?: string;
  @Expose({ name: "enable" }) isActive?: boolean;
  @Expose({ name: "user__first_name__unaccent" })
  responsible!: string;

  fromDomain(domainObject: FilterRateTypeModel = {}) {
    if (isBoolean(domainObject.enabled)) {
      this.isActive = domainObject.enabled;
    }
    if (domainObject.createdAt) {
      super.fromChild(domainObject.createdAt);
    }

    this.minPower = domainObject.minPower;
    this.maxPower = domainObject.maxPower;

    this.energyType = domainObject.energyType;
    this.name = domainObject.name || "";
    this.responsible = domainObject.responsible || "";
  }

  toJson() {
    return toJson(this);
  }
}
