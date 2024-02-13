import { Expose } from "class-transformer";
import { AddressModel } from "@/src/core/app/domain/models/address";

export class AddressDataModel {
  @Expose()
  type!: string;
  @Expose()
  name!: string;
  @Expose()
  number!: string;
  @Expose()
  subdivision!: string;
  @Expose()
  others!: string;
  @Expose({ name: "postal_code" })
  postalCode!: string;
  @Expose()
  city!: string;
  @Expose()
  province!: string;

  fromDomain(address: AddressModel) {
    this.type = address.type;
    this.name = address.name;
    this.number = address.number;
    this.subdivision = address.subdivision;
    this.others = address.others;
    this.postalCode = address.postalCode;
    this.city = address.city;
    this.province = address.province;
  }

  toDomain() {
    return new AddressModel({
      type: this.type,
      name: this.name,
      number: this.number,
      subdivision: this.subdivision,
      others: this.others,
      postalCode: this.postalCode,
      city: this.city,
      province: this.province
    });
  }
}
