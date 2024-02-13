export class AddressModel {
  type: string;
  name: string;
  number: string;
  subdivision: string;
  others: string;
  postalCode: string;
  city: string;
  province: string;

  constructor(address: {
    type: string;
    name: string;
    number: string;
    subdivision: string;
    others: string;
    postalCode: string;
    city: string;
    province: string;
  }) {
    this.type = address.type;
    this.name = address.name;
    this.number = address.number;
    this.subdivision = address.subdivision;
    this.others = address.others;
    this.postalCode = address.postalCode;
    this.city = address.city;
    this.province = address.province;
  }
}
