import type { EnergyTypes } from "@/src/core/app/enums/energy_types";
import type { CounterTypes } from "@/src/core/app/enums/counter_types";
import type { OwnerTypes } from "@/src/core/app/enums/owner_types";

export class EditSupplyPointModel {
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

  constructor(supply_point: {
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
  }) {
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
  }
}
