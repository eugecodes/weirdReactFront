import type { Id } from "@/src/common/utils/types";

export class CreateContractModel {
  supplyPointId: Id;
  rateId: Id;
  power1: number;
  power2: number;
  power3: number;
  power4: number;
  power5: number;
  power6: number;
  preferredStartDate: string;
  period: number;
  signatureFirstName: string;
  signatureLastName: string;
  signatureDni: string;
  signatureEmail: string;
  signaturePhone: string;

  constructor(contract: {
    supplyPointId: Id;
    rateId: Id;
    power1: number;
    power2: number;
    power3: number;
    power4: number;
    power5: number;
    power6: number;
    preferredStartDate: string;
    period: number;
    signatureFirstName: string;
    signatureLastName: string;
    signatureDni: string;
    signatureEmail: string;
    signaturePhone: string;
  }) {
    this.supplyPointId = contract.supplyPointId;
    this.rateId = contract.rateId;
    this.power1 = contract.power1;
    this.power2 = contract.power2;
    this.power3 = contract.power3;
    this.power4 = contract.power4;
    this.power5 = contract.power5;
    this.power6 = contract.power6;
    this.preferredStartDate = contract.preferredStartDate;
    this.period = contract.period;
    this.signatureFirstName = contract.signatureFirstName;
    this.signatureLastName = contract.signatureLastName;
    this.signatureDni = contract.signatureDni;
    this.signatureEmail = contract.signatureEmail;
    this.signaturePhone = contract.signaturePhone;
  }
}
