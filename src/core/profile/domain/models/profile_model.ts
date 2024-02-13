import type { Id } from "@/src/common/utils/types";
import type { UserModel } from "@/src/core/user/domain/models/user_model";

export class ProfileModel {
  id: Id;
  name: string;
  surnames: string;
  email: string;
  role?: string;
  enabled: boolean;
  deleted: boolean;
  createdAt: string;
  responsible?: UserModel;

  constructor(profile: {
    id: Id;
    name: string;
    surnames: string;
    email: string;
    enabled: boolean;
    deleted: boolean;
    createdAt: string;
    role?: string;
    responsible?: UserModel;
  }) {
    this.id = profile.id;
    this.name = profile.name;
    this.surnames = profile.surnames;
    this.email = profile.email;
    this.role = profile.role;
    this.enabled = profile.enabled;
    this.deleted = profile.deleted;
    this.createdAt = profile.createdAt;
    this.responsible = profile.responsible;
  }

  fullName() {
    return this.name + " " + this.surnames;
  }

  creationData() {
    return {
      createdAt: this.createdAt,
      createdBy: this.responsible?.name || ""
    };
  }
}
