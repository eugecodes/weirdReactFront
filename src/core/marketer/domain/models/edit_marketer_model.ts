import type { AddressModel } from "@/src/core/app/domain/models/address";

export class EditMarketerModel {
  name: string;
  fiscalName?: string;
  cif?: string;
  email?: string;
  fee?: number;
  maxConsume?: number;
  consumeRange?: string;
  address?: AddressModel;

  constructor(marketer: {
    name: string;
    fiscalName?: string;
    cif?: string;
    email?: string;
    fee?: number;
    maxConsume?: number;
    consumeRange?: string;
    address?: AddressModel;
  }) {
    this.name = marketer.name;
    this.fiscalName = marketer.fiscalName;
    this.cif = marketer.cif;
    this.email = marketer.email;
    this.fee = marketer.fee;
    this.maxConsume = marketer.maxConsume;
    this.consumeRange = marketer.consumeRange;
    this.address = marketer.address;
  }
}
