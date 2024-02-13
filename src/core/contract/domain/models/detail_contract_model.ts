import type { Id } from "@/src/common/utils/types";
import type { UserModel } from "@/src/core/user/domain/models/user_model";
import type { ConstructorType } from "@/src/common/interfaces/constructor_type";
import type { SupplyPointModel } from "@/src/core/supply_point/domain/models/supply_point_model";
import type { RateModel } from "@/src/core/rate/domain/models/rate_model";
import type { ContractStatus } from "@/src/core/app/enums/contract_status";

export class DetailContractModel {
  id: Id;
  isActive: boolean;
  status: ContractStatus;
  statusMessage?: string;
  preferredStartDate: string;
  startDate: string;
  expectedEndDate: string;
  endDate: string;
  createdAt: string;
  power1?: number;
  power2?: number;
  power3?: number;
  power4?: number;
  power5?: number;
  power6?: number;
  period?: number;
  signatureFirstName: string;
  signatureLastName: string;
  signatureDni: string;
  signatureEmail: string;
  signaturePhone: string;
  supplyPoint: SupplyPointModel;
  rate: RateModel;
  user: UserModel;

  constructor(contract: ConstructorType<DetailContractModel>) {
    this.id = contract.id;
    this.isActive = contract.isActive;
    this.status = contract.status;
    this.statusMessage = contract.statusMessage;
    this.preferredStartDate = contract.preferredStartDate;
    this.startDate = contract.startDate;
    this.expectedEndDate = contract.expectedEndDate;
    this.endDate = contract.endDate;
    this.createdAt = contract.createdAt;
    this.power1 = contract.power1;
    this.power2 = contract.power2;
    this.power3 = contract.power3;
    this.power4 = contract.power4;
    this.power5 = contract.power5;
    this.power6 = contract.power6;
    this.period = contract.period;
    this.signatureFirstName = contract.signatureFirstName;
    this.signatureLastName = contract.signatureLastName;
    this.signatureDni = contract.signatureDni;
    this.signatureEmail = contract.signatureEmail;
    this.signaturePhone = contract.signaturePhone;
    this.supplyPoint = contract.supplyPoint;
    this.rate = contract.rate;
    this.user = contract.user;
  }

  creationData() {
    return {
      createdAt: this.createdAt,
      createdBy: this.user?.name || ""
    };
  }
}
