import { fromDataDateStringToDomainDate } from "@/src/common/utils/dates";
import { toJson } from "@/src/common/utils/transformers";
import { Expose, Type } from "class-transformer";
import { UserDataModel } from "@/src/core/user/data/models/user_data_model";
import { EnergyCostModel } from "@/src/core/energy_cost/domain/models/energy_cost_model";
import type { DataModel } from "@/src/common/interfaces/data_model";

export class EnergyCostDataModel implements DataModel<EnergyCostModel> {
  @Expose() id!: number;
  @Expose() concept!: string;
  @Expose() amount!: number;
  @Expose({ name: "is_protected" }) isProtected!: boolean;
  @Expose({ name: "is_active" }) isActive!: boolean;
  @Expose({ name: "create_at" }) createdAt!: string;
  @Expose({ name: "user" })
  @Type(() => UserDataModel)
  responsible!: UserDataModel;

  toDomain(): EnergyCostModel {
    return new EnergyCostModel({
      id: this.id,
      concept: this.concept,
      amount: this.amount,
      enabled: this.isActive,
      isProtected: this.isProtected,
      createdAt: fromDataDateStringToDomainDate(this.createdAt),
      responsible: this.responsible.toDomain()
    });
  }

  fromDomain(domainObject: EnergyCostModel) {
    this.id = domainObject.id;
    this.concept = domainObject.concept;
    this.amount = domainObject.amount;
    this.isActive = domainObject.enabled;
    this.createdAt = domainObject.createdAt;
  }

  toJson() {
    return toJson(this);
  }
}
