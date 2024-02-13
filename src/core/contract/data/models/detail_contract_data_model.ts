import { toJson } from "@/src/common/utils/transformers";
import { Expose, Type } from "class-transformer";
import type { Id } from "@/src/common/utils/types";
import { UserDataModel } from "@/src/core/user/data/models/user_data_model";
import { DetailContractModel } from "@/src/core/contract/domain/models/detail_contract_model";
import { SupplyPointDataModel } from "@/src/core/supply_point/data/models/supply_point_data_model";
import { RateDataModel } from "@/src/core/rate/data/models/rate_data_model";
import type { ContractStatus } from "@/src/core/app/enums/contract_status";

export class DetailContractDataModel {
  @Expose()
  id!: Id;
  @Expose({ name: "is_active" })
  isActive!: boolean;
  @Expose({ name: "status" })
  status!: ContractStatus;
  @Expose({ name: "status_message" })
  statusMessage?: string;
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

  toDomain(): DetailContractModel {
    return new DetailContractModel({
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
      supplyPoint: this.supplyPoint?.toDomain(),
      rate: this.rate?.toDomain(),
      user: this.user?.toDomain()
    });
  }

  toJson() {
    return toJson(this);
  }
}
