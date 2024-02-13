import { Expose } from "class-transformer";
import type { FilterMarketerModel } from "@/src/core/marketer/domain/models/filter_marketer_model";
import { toJson } from "@/src/common/utils/transformers";
import { isBoolean } from "lodash";
import { CreateAtFilterDataModel } from "@/src/core/app/data/models/create_at_filter_data_model";

export class FilterMarketerDataModel extends CreateAtFilterDataModel {
  @Expose({ name: "name__unaccent" })
  name!: string;
  @Expose({ name: "fiscal_name__unaccent" })
  fiscalName!: string;
  @Expose({ name: "cif___unaccent" })
  cif!: string;
  @Expose({ name: "email__unaccent" })
  email!: string;
  @Expose({ name: "is_active" })
  isActive!: boolean;
  @Expose({ name: "user__first_name__unaccent" })
  responsible!: string;

  fromDomain(domainObject: FilterMarketerModel) {
    if (isBoolean(domainObject.enabled)) {
      this.isActive = domainObject.enabled;
    }

    if (domainObject.createdAt) {
      super.fromChild(domainObject.createdAt);
    }

    this.name = domainObject.name || "";
    this.fiscalName = domainObject.fiscalName || "";
    this.cif = domainObject.cif || "";
    this.email = domainObject.email || "";
    this.responsible = domainObject.responsible || "";
  }

  toJson() {
    return toJson(this);
  }
}
