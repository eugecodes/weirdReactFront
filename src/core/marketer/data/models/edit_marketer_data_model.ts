import { Expose, Type } from "class-transformer";
import { toJson } from "@/src/common/utils/transformers";
import type { DataModel } from "@/src/common/interfaces/data_model";
import { AddressDataModel } from "@/src/core/app/data/models/address";
import { EditMarketerModel } from "@/src/core/marketer/domain/models/edit_marketer_model";
import { fromDataDateToYear, fromYearToDate } from "@/src/common/utils/dates";

export class EditMarketerDataModel implements DataModel<EditMarketerModel> {
  @Expose()
  name!: string;
  @Expose({ name: "fiscal_name" })
  fiscalName?: string;
  @Expose()
  cif?: string;
  @Expose()
  email?: string;
  @Expose()
  fee?: number;
  @Expose({ name: "max_consume" })
  maxConsume?: number;
  @Expose({ name: "consume_range_datetime" })
  consumeRange?: string;
  @Expose()
  @Type(() => AddressDataModel)
  address: AddressDataModel = new AddressDataModel();

  fromDomain(marketer: EditMarketerModel) {
    this.name = marketer.name;
    this.fiscalName = marketer.fiscalName;
    this.cif = marketer.cif;
    this.email = marketer.email;
    this.fee = marketer.fee;
    this.maxConsume = marketer.maxConsume;

    if (marketer.consumeRange) {
      this.consumeRange = fromYearToDate(marketer.consumeRange);
    }

    if (marketer.address) {
      this.address.fromDomain(marketer.address);
    }
  }

  toDomain() {
    return new EditMarketerModel({
      name: this.name,
      fiscalName: this.fiscalName,
      cif: this.cif,
      email: this.email,
      fee: this.fee,
      maxConsume: this.maxConsume,
      consumeRange: this.consumeRange ? fromDataDateToYear(this.consumeRange) : undefined,
      address: this.address.toDomain()
    });
  }

  toJson() {
    return toJson(this);
  }
}
