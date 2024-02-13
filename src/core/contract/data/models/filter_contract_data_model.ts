import { toJson } from "@/src/common/utils/transformers";
import { Expose } from "class-transformer";
import type { FilterContractModel } from "@/src/core/contract/domain/models/filter_contract_model";
import { CreateAtFilterDataModel } from "@/src/core/app/data/models/create_at_filter_data_model";
import type { Id } from "@/src/common/utils/types";
import type { ContractStatus } from "@/src/core/app/enums/contract_status";

export class FiltersContractDataModel extends CreateAtFilterDataModel {
  @Expose()
  id?: Id;
  @Expose()
  cups?: string;
  @Expose({ name: "status" })
  status?: ContractStatus;

  @Expose({ name: "supply_city__unaccent" })
  supplyCity?: string;
  @Expose({ name: "supply_province__unaccent" })
  supplyProvince?: string;

  @Expose({ name: "created_at" })
  createdAt?: string;
  @Expose({ name: "user__first_name__unaccent" })
  user?: string;
  fromDomain(domainObject: FilterContractModel = {}) {
    if (domainObject.createdAt) {
      super.fromChild(domainObject.createdAt);
    }
    this.id = domainObject.id;
    this.cups = domainObject.cups;
    this.status = domainObject.status;
    this.supplyCity = domainObject.supplyCity;
    this.supplyProvince = domainObject.supplyProvince;
    this.user = domainObject.user;
  }

  toJson() {
    return toJson(this);
  }
}
