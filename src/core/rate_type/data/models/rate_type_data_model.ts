import { fromDataDateStringToDomainDate } from "@/src/common/utils/dates";
import { toJson } from "@/src/common/utils/transformers";
import { Expose, Type } from "class-transformer";
import { UserDataModel } from "@/src/core/user/data/models/user_data_model";
import { RateTypeModel } from "@/src/core/rate_type/domain/models/rate_type_model";
import type { DataModel } from "@/src/common/interfaces/data_model";
import type { EnergyTypes } from "@/src/core/app/enums/energy_types";

export class RateTypeDataModel implements DataModel<RateTypeModel> {
  @Expose() id!: number;
  @Expose() name!: string;
  @Expose({ name: "energy_type" }) energyType!: EnergyTypes;
  @Expose({ name: "min_power" }) minPower?: number;
  @Expose({ name: "max_power" }) maxPower?: number;
  @Expose({ name: "enable" }) isActive!: boolean;
  @Expose({ name: "create_at" }) createdAt!: string;
  @Expose({ name: "user" })
  @Type(() => UserDataModel)
  responsible!: UserDataModel;

  toDomain(): RateTypeModel {
    return new RateTypeModel({
      id: this.id,
      name: this.name,
      minPower: this.minPower,
      maxPower: this.maxPower,
      energyType: this.energyType,
      enabled: this.isActive,
      createdAt: fromDataDateStringToDomainDate(this.createdAt),
      responsible: this.responsible.toDomain()
    });
  }

  fromDomain(domainObject: RateTypeModel) {
    this.id = domainObject.id;
    this.name = domainObject.name;
    this.energyType = domainObject.energyType;
    this.maxPower = domainObject.maxPower;
    this.minPower = domainObject.minPower;
    this.isActive = domainObject.enabled;
    this.createdAt = domainObject.createdAt;
  }

  toJson() {
    return toJson(this);
  }
}
