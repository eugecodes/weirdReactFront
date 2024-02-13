import type { Id } from "@/src/common/utils/types";
import type { AddressModel } from "@/src/core/app/domain/models/address";
import type { UserModel } from "@/src/core/user/domain/models/user_model";

export class DetailMarketerModel {
  id: Id;
  name: string;
  fiscalName: string;
  cif: string;
  email: string;
  fee: number;
  maxConsume: number;
  consumeRange: string;
  address?: AddressModel;
  enabled: boolean;
  createdAt: string;
  responsible?: UserModel;

  constructor(marketer: {
    id: Id;
    name: string;
    fiscalName: string;
    cif: string;
    email: string;
    fee: number;
    maxConsume: number;
    consumeRange: string;
    address?: AddressModel;
    enabled: boolean;
    createdAt: string;
    responsible?: UserModel;
  }) {
    this.id = marketer.id;
    this.name = marketer.name;
    this.fiscalName = marketer.fiscalName;
    this.cif = marketer.cif;
    this.email = marketer.email;
    this.fee = marketer.fee;
    this.maxConsume = marketer.maxConsume;
    this.consumeRange = marketer.consumeRange;
    this.address = marketer.address;
    this.enabled = marketer.enabled;
    this.createdAt = marketer.createdAt;

    if (marketer.responsible) {
      this.responsible = marketer.responsible;
    }
  }

  creationData() {
    return {
      createdAt: this.createdAt,
      createdBy: this.responsible?.name || ""
    };
  }
}
