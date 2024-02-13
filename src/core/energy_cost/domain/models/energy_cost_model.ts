import type { ConstructorType } from "@/src/common/interfaces/constructor_type";
import type { Id } from "@/src/common/utils/types";
import type { UserModel } from "@/src/core/user/domain/models/user_model";

export class EnergyCostModel {
  id: Id;
  concept: string;
  amount: number;
  isProtected: boolean;
  enabled: boolean;
  createdAt: string;
  responsible?: UserModel;

  constructor(energyCost: ConstructorType<EnergyCostModel>) {
    this.id = energyCost.id;
    this.concept = energyCost.concept;
    this.amount = energyCost.amount;
    this.isProtected = energyCost.isProtected;
    this.enabled = energyCost.enabled;
    this.createdAt = energyCost.createdAt;

    if (energyCost.responsible) {
      this.responsible = energyCost.responsible;
    }
  }

  creationData() {
    return {
      createdAt: this.createdAt,
      createdBy: this.responsible?.name || ""
    };
  }
}
