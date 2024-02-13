import { toJson } from "@/src/common/utils/transformers";
import { Expose } from "class-transformer";
import type { FilterSupplyPointModel } from "@/src/core/supply_point/domain/models/filter_supply_point_model";
import { CreateAtFilterDataModel } from "@/src/core/app/data/models/create_at_filter_data_model";
import type { Id } from "@/src/common/utils/types";
import type { EnergyTypes } from "@/src/core/app/enums/energy_types";

export class FiltersSupplyPointDataModel extends CreateAtFilterDataModel {
  @Expose()
  id?: Id;
  @Expose()
  cups?: string;
  @Expose({ name: "energy_type" })
  energyType?: EnergyTypes;
  @Expose({ name: "supply_postal_code__unaccent" })
  supplyPostalCode?: string;
  @Expose({ name: "supply_city__unaccent" })
  supplyCity?: string;
  @Expose({ name: "supply_province__unaccent" })
  supplyProvince?: string;

  @Expose({ name: "created_at" })
  createdAt?: string;
  @Expose({ name: "user__first_name__unaccent" })
  user?: string;
  @Expose({ name: "client_id" })
  clientId?: number;

  fromDomain(domainObject: FilterSupplyPointModel = {}) {
    if (domainObject.createdAt) {
      super.fromChild(domainObject.createdAt);
    }
    this.id = domainObject.id;
    this.cups = domainObject.cups;
    this.energyType = domainObject.energyType;
    this.supplyPostalCode = domainObject.supplyPostalCode;
    this.supplyCity = domainObject.supplyCity;
    this.supplyProvince = domainObject.supplyProvince;
    this.user = domainObject.user;
    this.clientId = domainObject.clientId;
  }

  toJson() {
    return toJson(this);
  }
}
