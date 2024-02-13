import type { PatchContractModel } from "@/src/core/contract/domain/models/patch_contract_model";
import { toJson } from "@/src/common/utils/transformers";
import { Expose } from "class-transformer";
import type { ContractStatus } from "@/src/core/app/enums/contract_status";

export class PatchContractDataModel {
  @Expose({ name: "status" })
  status?: ContractStatus;
  @Expose({ name: "status_message" })
  statusMessage?: string;

  fromDomain(domainObject: Partial<PatchContractModel>) {
    this.status = domainObject.status;
    this.statusMessage = domainObject.statusMessage;
  }

  toJson() {
    return toJson(this);
  }
}
