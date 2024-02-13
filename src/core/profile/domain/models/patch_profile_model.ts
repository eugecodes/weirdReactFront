import type { Id } from "@/src/common/utils/types";

export class PatchProfileModel {
  id: Id;
  name: string;
  surnames: string;
  email: string;
  password: string;
  enabled: boolean;
  deleted: boolean;

  constructor(profile: { id: Id; name: string; surnames: string; email: string; password: string; enabled: boolean; deleted: boolean }) {
    this.id = profile.id;
    this.name = profile.name;
    this.surnames = profile.surnames;
    this.email = profile.email;
    this.password = profile.password;
    this.enabled = profile.enabled;
    this.deleted = profile.deleted;
  }
}
