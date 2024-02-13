import { Expose } from "class-transformer";
import { toJson } from "@/src/common/utils/transformers";
import type { Id } from "@/src/common/utils/types";
import type { EditContractModel } from "@/src/core/contract/domain/models/edit_contract_model";
import type { ContractStatus } from "@/src/core/app/enums/contract_status";

export class EditContractDataModel {
  @Expose({ name: "status" })
  status!: ContractStatus;
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
  @Expose({ name: "start_date" })
  startDate?: string;
  @Expose({ name: "expected_end_date" })
  expectedEndDate!: string;
  @Expose({ name: "end_date" })
  endDate?: string;
  @Expose({ name: "rate_id" })
  rateId!: Id;

  fromDomain(domainObject: EditContractModel) {
    this.status = domainObject.status;
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
    this.startDate = domainObject.startDate;
    this.expectedEndDate = domainObject.expectedEndDate;
    this.endDate = domainObject.endDate;
    this.rateId = domainObject.rateId;
  }

  toJson() {
    return toJson(this);
  }
}
