import { Expose, Type } from "class-transformer";
import type { Id } from "@/src/common/utils/types";
import type { ClientType } from "@/src/core/app/enums/client_type";
import type { EnergyTypes } from "@/src/core/app/enums/energy_types";
import type { CostType } from "@/src/core/app/enums/cost_type";
import { BasicRateDataModel } from "@/src/core/rate/data/models/basic_rate_data_model";
import { DetailCostModel } from "../../domain/models/detail_cost_model";
import { fromDataDateStringToDomainDate } from "@/src/common/utils/dates";

export class DetailCostDataModel {
  @Expose()
  id!: Id;
  @Expose({ name: "marketer_id" })
  marketerId!: Id;
  @Expose()
  name!: string;
  @Expose()
  mandatory!: boolean;
  @Expose({ name: "client_types" })
  clientTypes!: ClientType[];
  @Expose({ name: "energy_type" })
  energyType!: EnergyTypes;
  @Expose()
  @Type(() => BasicRateDataModel)
  rates!: BasicRateDataModel[];
  @Expose({ name: "min_power" })
  minPower!: number;
  @Expose({ name: "max_power" })
  maxPower!: number;
  @Expose()
  quantity!: number;
  @Expose()
  type!: CostType;
  @Expose({ name: "extra_fee" })
  extraFee?: number;
  @Expose({ name: "is_active" }) isActive!: boolean;
  @Expose({ name: "create_at" }) createdAt!: string;

  toDomain() {
    let marketerId: number | undefined = undefined;
    let energyType: EnergyTypes | undefined = undefined;
    this.rates.forEach(({ marketer, rateType }) => {
      marketerId = marketer?.id;
      energyType = rateType?.energyType;
    });

    return new DetailCostModel({
      id: this.id,
      marketerId,
      name: this.name,
      mandatory: this.mandatory,
      clientTypes: this.clientTypes,
      energyType,
      rates: this.rates.map((rate) => rate?.toDomain()),
      minPower: this.minPower,
      maxPower: this.maxPower,
      type: this.type,
      quantity: this.quantity,
      extraFee: this.extraFee,
      enabled: this.isActive,
      createdAt: fromDataDateStringToDomainDate(this.createdAt)
    });
  }
}
