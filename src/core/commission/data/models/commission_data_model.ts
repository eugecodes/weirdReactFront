import { fromDataDateStringToDomainDate } from "@/src/common/utils/dates";
import { toJson } from "@/src/common/utils/transformers";
import { Expose, Type } from "class-transformer";
import { CommissionModel } from "@/src/core/commission/domain/models/commission_model";
import type { DataModel } from "@/src/common/interfaces/data_model";
import type { Id } from "@/src/common/utils/types";
import { BasicRateDataModel } from "@/src/core/rate/data/models/basic_rate_data_model";
import { BasicRateTypeDataModel } from "@/src/core/rate_type/data/models/basic_rate_type_data_model";
import type { PriceType } from "@/src/core/app/enums/price_type";

export class CommissionDataModel implements DataModel<CommissionModel> {
  @Expose()
  id!: Id;
  @Expose({ name: "marketer_id" })
  marketerId?: Id;
  @Expose()
  name!: string;
  @Expose({ name: "price_type" })
  priceType!: PriceType;
  @Expose({ name: "rate_type" })
  @Type(() => BasicRateTypeDataModel)
  rateType?: BasicRateTypeDataModel;
  @Expose()
  @Type(() => BasicRateDataModel)
  rates!: BasicRateDataModel[];
  @Expose({ name: "min_power" })
  minPower?: number;
  @Expose({ name: "max_power" })
  maxPower?: number;
  @Expose({ name: "min_consumption" })
  minConsumption?: number;
  @Expose({ name: "max_consumption" })
  maxConsumption?: number;
  @Expose({ name: "percentage_test_commission" })
  percentagetestCommission?: number;
  @Expose({ name: "test_commission" })
  testCommission?: number;
  @Expose({ name: "create_at" }) createdAt!: string;

  toDomain(): CommissionModel {
    let priceType: PriceType | undefined = undefined;
    let marketerId: Id | undefined = undefined;
    this.rates.forEach((rate) => {
      if (rate.priceType) {
        priceType = rate.priceType;
      }
      if (rate.marketerId) {
        marketerId = rate.marketerId;
      }
    });

    return new CommissionModel({
      id: this.id,
      marketerId: marketerId,
      name: this.name,
      priceType,
      /* This will be always accomplished: see more: https://www.notion.so/mrmilu/Comercializadoras-a065e546e24e42d5b9607e7f6c8ecae4#c44bd272fff845478d76480f90489944 */
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      energyType: (this.rateType?.energyType || this.rates[0]?.rateType?.energyType)!,
      rates: this.rates.map((rate) => rate.toDomain()),
      rateType: this.rateType?.toDomain(),
      minPower: this.minPower,
      maxPower: this.maxPower,
      minConsumption: this.minConsumption,
      maxConsumption: this.maxConsumption,
      percentagetestCommission: this.percentagetestCommission,
      testCommission: this.testCommission,
      createdAt: fromDataDateStringToDomainDate(this.createdAt)
    });
  }

  fromDomain(domainObject: CommissionModel) {
    this.id = domainObject.id;
    this.marketerId = domainObject.marketerId;
    this.name = domainObject.name;
    this.minPower = domainObject.minPower;
    this.maxPower = domainObject.maxPower;
    this.minConsumption = domainObject.minConsumption;
    this.maxConsumption = domainObject.maxConsumption;
    this.percentagetestCommission = domainObject.percentagetestCommission;
    this.testCommission = domainObject.testCommission;
    this.createdAt = domainObject.createdAt;

    this.rateType = domainObject.rateType
      ? new BasicRateTypeDataModel().fromDomain({ ...domainObject.rateType, energyType: domainObject.energyType })
      : undefined;

    let priceTypeValue: PriceType | undefined = undefined;
    this.rates = domainObject.rates.map(({ id, name, priceType }) => {
      priceTypeValue = priceType;
      const rate = new BasicRateDataModel();
      rate.fromDomain({ id, name });
      return rate;
    });

    this.priceType = priceTypeValue || this.priceType;
  }

  toJson() {
    return toJson(this);
  }
}
