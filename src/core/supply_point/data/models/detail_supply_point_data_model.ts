import { fromDataDateStringToDomainDate } from "@/src/common/utils/dates";
import { toJson } from "@/src/common/utils/transformers";
import { Expose, Type } from "class-transformer";
import type { Id } from "@/src/common/utils/types";
import { UserDataModel } from "@/src/core/user/data/models/user_data_model";
import { DetailSupplyPointModel } from "@/src/core/supply_point/domain/models/detail_supply_point_model";
import type { EnergyTypes } from "@/src/core/app/enums/energy_types";
import { ClientDataModel } from "@/src/core/client/data/models/client_data_model";
import type { CounterTypes } from "@/src/core/app/enums/counter_types";
import type { OwnerTypes } from "@/src/core/app/enums/owner_types";

export class DetailSupplyPointDataModel {
  @Expose()
  id!: Id;
  @Expose({ name: "is_active" })
  isActive!: boolean;
  @Expose({ name: "create_at" })
  createdAt!: string;
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

  @Expose({ name: "user" })
  @Type(() => UserDataModel)
  user!: UserDataModel;
  @Expose({ name: "client" })
  @Type(() => ClientDataModel)
  client!: ClientDataModel;

  toDomain(): DetailSupplyPointModel {
    return new DetailSupplyPointModel({
      id: this.id,
      isActive: this.isActive,
      energyType: this.energyType,
      cups: this.cups,
      alias: this.alias || "",
      supplyAddress: this.supplyAddress,
      supplyPostalCode: this.supplyPostalCode,
      supplyCity: this.supplyCity,
      supplyProvince: this.supplyProvince,
      bankAccountHolder: this.bankAccountHolder || "",
      bankAccountNumber: this.bankAccountNumber || "",
      fiscalAddress: this.fiscalAddress || "",
      isRenewable: this.isRenewable,
      maxAvailablePower: this.maxAvailablePower,
      voltage: this.voltage,
      counterType: this.counterType,
      counterProperty: this.counterProperty,
      counterPrice: this.counterPrice,
      createdAt: fromDataDateStringToDomainDate(this.createdAt),
      user: this.user?.toDomain(),
      client: this.client?.toDomain()
    });
  }

  toJson() {
    return toJson(this);
  }
}
