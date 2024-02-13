import { toJson } from "@/src/common/utils/transformers";
import { Expose, Type } from "class-transformer";
import { ContractModel } from "@/src/core/contract/domain/models/contract_model";
import type { DataModel } from "@/src/common/interfaces/data_model";
import type { Id } from "@/src/common/utils/types";
import { SupplyPointDataModel } from "@/src/core/supply_point/data/models/supply_point_data_model";
import { RateDataModel } from "@/src/core/rate/data/models/rate_data_model";
import { UserDataModel } from "@/src/core/user/data/models/user_data_model";
import type { ContractStatus } from "@/src/core/app/enums/contract_status";

export class ContractDataModel implements DataModel<ContractModel> {
  @Expose()
  id!: Id;
  @Expose({ name: "is_active" })
  isActive!: boolean;
  @Expose({ name: "status" })
  status!: ContractStatus;
  @Expose({ name: "status_message" })
  statusMessage?: string;
  client?: string;
  cif?: string;
  cups?: string;
  supplyAlias?: string;
  supplyAddress?: string;
  supplyCity?: string;
  supplyProvince?: string;
  rateType?: string;
  rateName?: string;

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

  @Expose({ name: "signatureFirstName" })
  signatureFirstName!: string;
  @Expose({ name: "signatureLastName" })
  signatureLastName!: string;
  @Expose({ name: "signatureDni" })
  signatureDni!: string;
  @Expose({ name: "signatureEmail" })
  signatureEmail!: string;
  @Expose({ name: "signaturePhone" })
  signaturePhone!: string;

  @Expose({ name: "preferred_start_date" })
  preferredStartDate!: string;
  @Expose({ name: "start_date" })
  startDate!: string;
  @Expose({ name: "expected_end_date" })
  expectedEndDate!: string;
  @Expose({ name: "end_date" })
  endDate!: string;
  @Expose({ name: "create_at" })
  createdAt!: string;

  @Expose({ name: "user" })
  @Type(() => UserDataModel)
  user!: UserDataModel;

  @Expose({ name: "supply_point" })
  @Type(() => SupplyPointDataModel)
  supplyPoint!: SupplyPointDataModel;

  @Expose({ name: "rate" })
  @Type(() => RateDataModel)
  rate!: RateDataModel;

  toDomain(): ContractModel {
    return new ContractModel({
      id: this.id,
      isActive: this.isActive,
      status: this.status,
      statusMessage: this.statusMessage,
      power1: this.power1,
      power2: this.power2,
      power3: this.power3,
      power4: this.power4,
      power5: this.power5,
      power6: this.power6,
      period: this.period,
      signatureFirstName: this.signatureFirstName,
      signatureLastName: this.signatureLastName,
      signatureDni: this.signatureDni,
      signatureEmail: this.signatureEmail,
      signaturePhone: this.signaturePhone,
      preferredStartDate: this.preferredStartDate,
      startDate: this.startDate || "",
      expectedEndDate: this.expectedEndDate,
      endDate: this.endDate,
      createdAt: this.createdAt,
      client: this.supplyPoint?.client?.fiscalName,
      cif: this.supplyPoint?.client?.cif,
      cups: this.supplyPoint?.cups,
      supplyAlias: this.supplyPoint?.alias,
      supplyAddress: this.supplyPoint?.supplyAddress,
      supplyCity: this.supplyPoint?.supplyCity,
      supplyProvince: this.supplyPoint?.supplyProvince,
      supplyPoint: this.supplyPoint?.toDomain(),
      rateType: this.rate?.rateType?.name,
      rateName: this.rate?.name,
      rate: this.rate?.toDomain(),
      user: this.user?.toDomain()
    });
  }

  fromDomain(domainObject: ContractModel) {
    this.id = domainObject.id;
    this.isActive = domainObject.isActive;
    this.statusMessage = domainObject.statusMessage;
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
    this.createdAt = domainObject.createdAt;
    this.client = domainObject.supplyPoint?.client?.fiscalName;
    this.cif = domainObject.supplyPoint?.client?.cif;
    this.supplyAlias = domainObject.supplyPoint?.alias;
    this.supplyAddress = domainObject.supplyPoint?.supplyAddress;
    this.supplyCity = domainObject.supplyPoint?.supplyCity;
    this.supplyProvince = domainObject.supplyPoint?.supplyProvince;
    this.rateType = domainObject.rate?.rateType?.name;
    this.rateName = domainObject.rate?.name;
  }

  toJson() {
    return toJson(this);
  }
}
