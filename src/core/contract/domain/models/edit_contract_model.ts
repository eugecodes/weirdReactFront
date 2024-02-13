import type { Id } from "@/src/common/utils/types";
import type { ContractStatus } from "@/src/core/app/enums/contract_status";

export class EditContractModel {
  rateId: Id;
  status: ContractStatus;
  power1: number;
  power2: number;
  power3: number;
  power4: number;
  power5: number;
  power6: number;
  startDate: string;
  endDate: string;
  preferredStartDate: string;
  expectedEndDate: string;
  period: number;
  signatureFirstName: string;
  signatureLastName: string;
  signatureDni: string;
  signatureEmail: string;
  signaturePhone: string;

  constructor(contract: {
    rateId: Id;
    status: ContractStatus;
    power1: number;
    power2: number;
    power3: number;
    power4: number;
    power5: number;
    power6: number;
    startDate: string;
    endDate: string;
    preferredStartDate: string;
    expectedEndDate: string;
    period: number;
    signatureFirstName: string;
    signatureLastName: string;
    signatureDni: string;
    signatureEmail: string;
    signaturePhone: string;
  }) {
    this.rateId = contract.rateId;
    this.status = contract.status;
    this.power1 = contract.power1;
    this.power2 = contract.power2;
    this.power3 = contract.power3;
    this.power4 = contract.power4;
    this.power5 = contract.power5;
    this.power6 = contract.power6;
    this.startDate = contract.startDate;
    this.endDate = contract.endDate;
    this.preferredStartDate = contract.preferredStartDate;
    this.expectedEndDate = contract.expectedEndDate;
    this.period = contract.period;
    this.signatureFirstName = contract.signatureFirstName;
    this.signatureLastName = contract.signatureLastName;
    this.signatureDni = contract.signatureDni;
    this.signatureEmail = contract.signatureEmail;
    this.signaturePhone = contract.signaturePhone;
  }
}
