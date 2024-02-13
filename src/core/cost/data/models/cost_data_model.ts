import { fromDataDateStringToDomainDate } from "@/src/common/utils/dates";
import { toJson } from "@/src/common/utils/transformers";
import { Expose, Type } from "class-transformer";
import { CostModel } from "@/src/core/cost/domain/models/cost_model";
import type { DataModel } from "@/src/common/interfaces/data_model";
import type { Id } from "@/src/common/utils/types";
import type { CostType } from "@/src/core/app/enums/cost_type";
import type { ClientType } from "@/src/core/app/enums/client_type";
import { BasicRateDataModel } from "@/src/core/rate/data/models/basic_rate_data_model";
import { isBoolean } from "lodash";

export class CostDataModel implements DataModel<CostModel> {
  @Expose() id!: Id;
  @Expose({ name: "marketer_id" })
  marketerId?: Id;
  @Expose()
  name!: string;
  @Expose({ name: "client_types" })
  clientTypes!: ClientType[];
  @Expose()
  @Type(() => BasicRateDataModel)
  rates!: BasicRateDataModel[];
  @Expose({ name: "min_power" })
  minPower!: number;
  @Expose({ name: "max_power" })
  maxPower!: number;
  @Expose()
  quantity!: number;
  @Expose({ name: "type" })
  costType!: CostType;
  @Expose({ name: "is_active" }) isActive!: boolean;
  @Expose({ name: "create_at" }) createdAt!: string;

  toDomain(): CostModel {
    let marketerId: number | undefined = undefined;
    this.rates.forEach(({ marketer }) => {
      marketerId = marketer?.id;
    });

    return new CostModel({
      id: this.id,
      marketerId,
      name: this.name,
      clientTypes: this.clientTypes,
      rates: this.rates.map((rate) => rate?.toDomain()),
      minPower: this.minPower,
      maxPower: this.maxPower,
      quantity: this.quantity,
      costType: this.costType,
      enabled: this.isActive,
      createdAt: fromDataDateStringToDomainDate(this.createdAt)
    });
  }

  fromDomain(domainObject: CostModel) {
    if (isBoolean(domainObject.enabled)) {
      this.isActive = domainObject.enabled;
    }

    this.id = domainObject.id;
    this.name = domainObject.name;
    this.clientTypes = domainObject.clientTypes;
    this.minPower = domainObject.minPower;
    this.maxPower = domainObject.maxPower;
    this.quantity = domainObject.quantity;
    this.costType = domainObject.costType;
    this.createdAt = domainObject.createdAt;

    let marketerId: number | undefined = undefined;
    this.rates = domainObject.rates.map(({ id, name, marketer }) => {
      const rate = new BasicRateDataModel();
      rate.fromDomain({ id, name, marketer });
      marketerId = marketer?.id;
      return rate;
    });
    this.marketerId = marketerId;
  }

  toJson() {
    return toJson(this);
  }
}
