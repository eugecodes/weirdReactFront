import type { Id } from "@/src/common/utils/types";
import type { UserModel } from "@/src/core/user/domain/models/user_model";
import type { ConstructorType } from "@/src/common/interfaces/constructor_type";
import type { EnergyTypes } from "@/src/core/app/enums/energy_types";
import type { CounterTypes } from "@/src/core/app/enums/counter_types";
import type { OwnerTypes } from "@/src/core/app/enums/owner_types";
import type { ClientModel } from "@/src/core/client/domain/models/client_model";

export class DetailSupplyPointModel {
  id: Id;
  isActive: boolean;
  energyType: EnergyTypes;
  cups: string;
  alias?: string;
  supplyAddress: string;
  supplyPostalCode: string;
  supplyCity: string;
  supplyProvince: string;
  bankAccountHolder?: string;
  bankAccountNumber?: string;
  fiscalAddress?: string;
  isRenewable?: boolean;
  maxAvailablePower?: number;
  voltage?: number;
  counterType?: CounterTypes;
  counterProperty?: OwnerTypes;
  counterPrice?: number;
  createdAt: string;
  user: UserModel;
  client: ClientModel;

  constructor(supply_point: ConstructorType<DetailSupplyPointModel>) {
    this.id = supply_point.id;
    this.isActive = supply_point.isActive;
    this.energyType = supply_point.energyType;
    this.cups = supply_point.cups;
    this.alias = supply_point.alias;
    this.supplyAddress = supply_point.supplyAddress;
    this.supplyPostalCode = supply_point.supplyPostalCode;
    this.supplyCity = supply_point.supplyCity;
    this.supplyProvince = supply_point.supplyProvince;
    this.bankAccountHolder = supply_point.bankAccountHolder;
    this.bankAccountNumber = supply_point.bankAccountNumber;
    this.fiscalAddress = supply_point.fiscalAddress;
    this.isRenewable = supply_point.isRenewable;
    this.maxAvailablePower = supply_point.maxAvailablePower;
    this.voltage = supply_point.voltage;
    this.counterType = supply_point.counterType;
    this.counterProperty = supply_point.counterProperty;
    this.counterPrice = supply_point.counterPrice;
    this.createdAt = supply_point.createdAt;
    this.user = supply_point.user;
    this.client = supply_point.client;
  }

  creationData() {
    return {
      createdAt: this.createdAt,
      createdBy: this.user?.name || ""
    };
  }
}
