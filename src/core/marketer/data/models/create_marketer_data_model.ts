import { toJson } from "@/src/common/utils/transformers";
import type { CreateMarketerModel } from "@/src/core/marketer/domain/models/create_marketer_model";
import { Expose } from "class-transformer";

export class CreateMarketerDataModel {
  @Expose()
  name!: string;
  @Expose({ name: "fiscal_name" })
  fiscalName!: string;
  @Expose()
  cif!: string;
  @Expose()
  email!: string;

  fromDomain(domainObject: CreateMarketerModel) {
    this.name = domainObject.name;
    this.fiscalName = domainObject.fiscalName;
    this.cif = domainObject.cif;
    this.email = domainObject.email;
  }

  toJson() {
    return toJson(this);
  }
}
