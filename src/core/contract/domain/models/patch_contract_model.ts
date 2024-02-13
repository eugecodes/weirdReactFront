import type { Id } from "@/src/common/utils/types";
import type { ContractStatus } from "@/src/core/app/enums/contract_status";

export class PatchContractModel {
  id: Id;
  status: ContractStatus;
  statusMessage: string;

  constructor(contract: { id: Id; status: ContractStatus; statusMessage: string }) {
    this.id = contract.id;
    this.status = contract.status;
    this.statusMessage = contract.statusMessage;
  }
}
