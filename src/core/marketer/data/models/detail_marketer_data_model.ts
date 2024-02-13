import { UserDataModel } from "@/src/core/user/data/models/user_data_model";
import { Expose, Type } from "class-transformer";
import { toJson } from "@/src/common/utils/transformers";
import type { DataModel } from "@/src/common/interfaces/data_model";
import { AddressDataModel } from "@/src/core/app/data/models/address";
import { DetailMarketerModel } from "@/src/core/marketer/domain/models/detail_marketer_model";
import { fromDataDateStringToDomainDate } from "@/src/common/utils/dates";
import dayjs from "dayjs";

export class DetailMarketerDataModel implements DataModel<DetailMarketerModel> {
  @Expose()
  id!: number;
  @Expose()
  name!: string;
  @Expose({ name: "fiscal_name" })
  fiscalName!: string;
  @Expose()
  cif!: string;
  @Expose()
  email!: string;
  @Expose()
  fee!: number;
  @Expose({ name: "max_consume" })
  maxConsume!: number;
  @Expose({ name: "consume_range_datetime" })
  consumeRange!: string;
  @Expose()
  @Type(() => AddressDataModel)
  address!: AddressDataModel;
  @Expose({ name: "is_active" })
  isActive!: boolean;
  @Expose({ name: "create_at" })
  createdAt!: string;
  @Expose({ name: "user" })
  @Type(() => UserDataModel)
  responsible!: UserDataModel;

  fromDomain(marketer: DetailMarketerModel) {
    this.id = marketer.id;
    this.name = marketer.name;
    this.fiscalName = marketer.fiscalName;
    this.cif = marketer.cif;
    this.email = marketer.email;
    this.fee = this.fee;
    this.maxConsume = marketer.maxConsume;
    this.consumeRange = marketer.consumeRange;
    this.isActive = marketer.enabled;
    this.createdAt = marketer.createdAt;
    if (marketer.address) {
      this.address.fromDomain(marketer.address);
    }
  }

  toDomain() {
    return new DetailMarketerModel({
      id: this.id,
      name: this.name,
      fiscalName: this.fiscalName,
      cif: this.cif,
      email: this.email,
      fee: this.fee,
      maxConsume: this.maxConsume,
      consumeRange: this.consumeRange ? dayjs(this.consumeRange).format("YYYY") : "",
      address: this.address?.toDomain(),
      enabled: this.isActive,
      createdAt: fromDataDateStringToDomainDate(this.createdAt),
      responsible: this.responsible.toDomain()
    });
  }

  toJson() {
    return toJson(this);
  }
}
