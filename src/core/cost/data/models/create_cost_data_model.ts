import { Expose } from "class-transformer";
import { toJson } from "@/src/common/utils/transformers";
import type { CreateCostModel } from "@/src/core/cost/domain/models/create_cost_model";
import type { Id } from "@/src/common/utils/types";
import type { ClientType } from "@/src/core/app/enums/client_type";
import type { EnergyTypes } from "@/src/core/app/enums/energy_types";
import type { CostType } from "@/src/core/app/enums/cost_type";

export class CreateCostDataModel {
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
  rates!: Id[];
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

  fromDomain(domainObject: CreateCostModel) {
    this.marketerId = domainObject.marketerId;
    this.name = domainObject.name;
    this.mandatory = domainObject.mandatory;
    this.clientTypes = domainObject.clientTypes;
    this.energyType = domainObject.energyType;
    this.minPower = domainObject.minPower;
    this.maxPower = domainObject.maxPower;
    this.type = domainObject.type;
    this.quantity = domainObject.quantity;
    this.extraFee = domainObject.extraFee;

    this.rates = domainObject.rates.map(({ id }) => id);
  }

  toJson() {
    return toJson(this);
  }
}
