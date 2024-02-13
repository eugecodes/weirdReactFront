import { UserDataModel } from "@/src/core/user/data/models/user_data_model";
import { Expose, Type } from "class-transformer";
import { MarketerModel } from "@/src/core/marketer/domain/models/marketer_model";
import { toJson } from "@/src/common/utils/transformers";
import type { DataModel } from "@/src/common/interfaces/data_model";
import { fromDataDateStringToDomainDate } from "@/src/common/utils/dates";

export class MarketerDataModel implements DataModel<MarketerModel> {
  @Expose()
  id!: number;
  @Expose()
  name!: string;
  @Expose({ name: "fiscal_name" })
  fiscalName!: string;
  @Expose()
  cif!: string;
  @Expose()
  email!: string;
  @Expose({ name: "is_active" })
  isActive!: boolean;
  @Expose({ name: "create_at" })
  createdAt!: string;
  @Expose({ name: "user" })
  @Type(() => UserDataModel)
  responsible!: UserDataModel;

  fromDomain(marketer: MarketerModel) {
    this.id = marketer.id;
    this.name = marketer.name;
    this.fiscalName = marketer.fiscalName;
    this.cif = marketer.cif;
    this.email = marketer.email;
    this.isActive = marketer.enabled;
    this.createdAt = marketer.createdAt;
  }

  toDomain() {
    return new MarketerModel({
      id: this.id,
      name: this.name,
      fiscalName: this.fiscalName,
      cif: this.cif,
      email: this.email,
      enabled: this.isActive,
      createdAt: fromDataDateStringToDomainDate(this.createdAt),
      responsible: this.responsible.toDomain()
    });
  }

  toJson() {
    return toJson(this);
  }
}
