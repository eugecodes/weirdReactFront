import type { Id } from "@/src/common/utils/types";
import type { UserModel } from "@/src/core/user/domain/models/user_model";

export class MarketerModel {
  id: Id;
  name: string;
  fiscalName: string;
  cif: string;
  email: string;
  enabled: boolean;
  createdAt: string;
  responsible?: UserModel;

  constructor(marketer: {
    id: Id;
    name: string;
    fiscalName: string;
    cif: string;
    email: string;
    enabled: boolean;
    createdAt: string;
    responsible?: UserModel;
  }) {
    this.id = marketer.id;
    this.name = marketer.name;
    this.fiscalName = marketer.fiscalName;
    this.cif = marketer.cif;
    this.email = marketer.email;
    this.enabled = marketer.enabled;
    this.createdAt = marketer.createdAt;

    if (marketer.responsible) {
      this.responsible = marketer.responsible;
    }
  }
}
