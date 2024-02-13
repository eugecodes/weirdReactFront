import { Expose } from "class-transformer";
import type { CreateSupplyPointModel } from "@/src/core/supply_point/domain/models/create_supply_point_model";
import { toJson } from "@/src/common/utils/transformers";
import type { Id } from "@/src/common/utils/types";
import type { EnergyTypes } from "@/src/core/app/enums/energy_types";
import type { CounterTypes } from "@/src/core/app/enums/counter_types";
import type { OwnerTypes } from "@/src/core/app/enums/owner_types";

export class CreateSupplyPointDataModel {
  @Expose()
  cups!: string;
  @Expose()
  alias?: string;
  @Expose({ name: "energy_type" })
  energyType!: EnergyTypes;

  @Expose({ name: "supply_address" })
  supplyAddress!: string;
  @Expose({ name: "supply_postal_code" })
  supplyPostalCode!: string;
  @Expose({ name: "supply_city" })
  supplyCity!: string;
  @Expose({ name: "supply_province" })
  supplyProvince!: string;

  @Expose({ name: "bank_account_holder" })
  bankAccountHolder?: string;
  @Expose({ name: "bank_account_number" })
  bankAccountNumber?: string;
  @Expose({ name: "fiscal_address" })
  fiscalAddress?: string;
  @Expose({ name: "is_renewable" })
  isRenewable?: boolean;

  @Expose({ name: "max_available_power" })
  maxAvailablePower?: number;
  @Expose({ name: "voltage" })
  voltage?: number;
  @Expose({ name: "counter_type" })
  counterType?: CounterTypes;
  @Expose({ name: "counter_property" })
  counterProperty?: OwnerTypes;
  @Expose({ name: "counter_price" })
  counterPrice?: number;
  @Expose({ name: "client_id" })
  clientId!: Id;

  fromDomain(domainObject: CreateSupplyPointModel) {
    this.energyType = domainObject.energyType;
    this.cups = domainObject.cups;
    this.alias = domainObject.alias;
    this.supplyAddress = domainObject.supplyAddress;
    this.supplyPostalCode = domainObject.supplyPostalCode;
    this.supplyCity = domainObject.supplyCity;
    this.supplyProvince = domainObject.supplyProvince;
    this.bankAccountHolder = domainObject.bankAccountHolder;
    this.bankAccountNumber = domainObject.bankAccountNumber;
    this.fiscalAddress = domainObject.fiscalAddress;
    this.isRenewable = domainObject.isRenewable;
    this.maxAvailablePower = domainObject.maxAvailablePower;
    this.voltage = domainObject.voltage;
    this.counterType = domainObject.counterType;
    this.counterProperty = domainObject.counterProperty;
    this.counterPrice = domainObject.counterPrice;
    this.clientId = domainObject.clientId;
  }

  toJson() {
    return toJson(this);
  }
}
