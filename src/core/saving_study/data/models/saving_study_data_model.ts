import { DATE_FORMAT_TO_SHOW, fromDataDateToDomainDate } from "@/src/common/utils/dates";
import { toJson } from "@/src/common/utils/transformers";
import { Expose, Type } from "class-transformer";
import { SavingStudyModel } from "@/src/core/saving_study/domain/models/saving_study_model";
import type { DataModel } from "@/src/common/interfaces/data_model";
import type { Id } from "@/src/common/utils/types";
import { BasicRateTypeDataModel } from "@/src/core/rate_type/data/models/basic_rate_type_data_model";
import type { StudyStatus } from "@/src/core/app/enums/study_status";
import { UserDataModel } from "@/src/core/user/data/models/user_data_model";
import type { ClientType } from "@/src/core/app/enums/client_type";
import { SelectedRateDataModel } from "./selected_rate/selected_rate_data_model";
import dayjs from "dayjs";

export class SavingStudyDataModel implements DataModel<SavingStudyModel> {
  @Expose()
  id!: Id;
  @Expose()
  cups!: string;
  @Expose({ name: "client_type" })
  clientType!: ClientType;
  @Expose({ name: "client_name" })
  clientName?: string;
  @Expose({ name: "client_nif" })
  clientNif?: string;
  @Expose({ name: "current_marketer" })
  marketer?: string;
  @Expose({ name: "selected_suggested_rate" })
  @Type(() => SelectedRateDataModel)
  selectedRate?: SelectedRateDataModel;
  @Expose({ name: "final_cost" })
  finalCost?: number;
  @Expose({ name: "theoretical_commission" })
  theoreticalCommission?: number;
  @Expose()
  totalCommission?: number;
  @Expose({ name: "saving_relative" })
  savingRelative?: number;
  @Expose({ name: "saving_absolute" })
  savingAbsolute?: number;
  @Expose({ name: "current_rate_type" })
  @Type(() => BasicRateTypeDataModel)
  rateType?: BasicRateTypeDataModel;
  @Expose()
  status!: StudyStatus;
  @Expose({ name: "create_at" })
  @Type(() => Date)
  createdAt!: Date;
  @Expose({ name: "user_creator" })
  @Type(() => UserDataModel)
  responsible!: UserDataModel;

  toDomain(): SavingStudyModel {
    return new SavingStudyModel({
      id: this.id,
      cups: this.cups,
      clientType: this.clientType,
      clientName: this.clientName,
      clientNif: this.clientNif,
      marketer: this.marketer,
      selectedRate: this.selectedRate?.toDomain(),
      finalCost: this.selectedRate?.finalCost,
      totalCommission: this.selectedRate?.totalCommission,
      savingRelative: this.selectedRate?.savingRelative,
      savingAbsolute: this.selectedRate?.savingAbsolute,
      rateType: this.rateType?.toDomain(),
      status: this.status,
      createdAt: fromDataDateToDomainDate(this.createdAt),
      responsible: this.responsible?.toDomain()
    });
  }

  fromDomain(domainObject: SavingStudyModel) {
    this.id = domainObject.id;
    this.cups = domainObject.cups;
    this.clientType = domainObject.clientType;
    this.clientName = domainObject.clientName;
    this.clientNif = domainObject.clientNif;
    this.marketer = domainObject.marketer;
    this.selectedRate = domainObject?.selectedRate ? new SelectedRateDataModel().fromDomain(domainObject.selectedRate) : undefined;
    this.finalCost = domainObject.finalCost;
    this.totalCommission = domainObject.totalCommission;
    this.savingRelative = domainObject.savingRelative;
    this.savingAbsolute = domainObject.savingAbsolute;
    this.rateType = domainObject?.rateType ? new BasicRateTypeDataModel().fromDomain(domainObject.rateType) : undefined;
    this.status = domainObject.status;
    this.createdAt = dayjs(domainObject.createdAt, DATE_FORMAT_TO_SHOW).toDate();
  }

  toJson() {
    return toJson(this);
  }
}
