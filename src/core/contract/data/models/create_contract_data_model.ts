import { Expose } from "class-transformer";
import type { CreateContractModel } from "@/src/core/contract/domain/models/create_contract_model";
import { toJson } from "@/src/common/utils/transformers";
import type { Id } from "@/src/common/utils/types";

export class CreateContractDataModel {
  @Expose({ name: "power_1" })
  power1?: number;
  @Expose({ name: "power_2" })
  power2?: number;
  @Expose({ name: "power_3" })
  power3?: number;
  @Expose({ name: "power_4" })
  power4?: number;
  @Expose({ name: "power_5" })
  power5?: number;
  @Expose({ name: "power_6" })
  power6?: number;
  @Expose({ name: "period" })
  period?: number;
  @Expose({ name: "signature_first_name" })
  signatureFirstName!: string;
  @Expose({ name: "signature_last_name" })
  signatureLastName!: string;
  @Expose({ name: "signature_dni" })
  signatureDni!: string;
  @Expose({ name: "signature_email" })
  signatureEmail!: string;
  @Expose({ name: "signature_phone" })
  signaturePhone!: string;
  @Expose({ name: "preferred_start_date" })
  preferredStartDate!: string;
  @Expose({ name: "supply_point_id" })
  supplyPointId!: Id;
  @Expose({ name: "rate_id" })
  rateId!: Id;

  fromDomain(domainObject: CreateContractModel) {
    this.power1 = domainObject.power1;
    this.power2 = domainObject.power2;
    this.power3 = domainObject.power3;
    this.power4 = domainObject.power4;
    this.power5 = domainObject.power5;
    this.power6 = domainObject.power6;
    this.period = domainObject.period;
    this.signatureFirstName = domainObject.signatureFirstName;
    this.signatureLastName = domainObject.signatureLastName;
    this.signatureDni = domainObject.signatureDni;
    this.signatureEmail = domainObject.signatureEmail;
    this.signaturePhone = domainObject.signaturePhone;
    this.preferredStartDate = domainObject.preferredStartDate;
    this.supplyPointId = domainObject.supplyPointId;
    this.rateId = domainObject.rateId;
  }

  toJson() {
    return toJson(this);
  }
}
