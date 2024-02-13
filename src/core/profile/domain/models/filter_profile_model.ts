export class FilterProfileModel {
  name?: string;
  surnames?: string;
  email?: string;
  role?: string;
  enabled?: boolean;
  deleted?: boolean;
  createdAt?: string;
  responsible?: string;

  constructor(profile: {
    name?: string;
    surnames?: string;
    email?: string;
    enabled?: boolean;
    deleted?: boolean;
    createdAt?: string;
    role?: string;
    responsible?: string;
  }) {
    this.name = profile.name;
    this.surnames = profile.surnames;
    this.email = profile.email;
    this.role = profile.role;
    this.enabled = profile.enabled;
    this.deleted = profile.deleted;
    this.createdAt = profile.createdAt;
    this.responsible = profile.responsible;
  }
}
