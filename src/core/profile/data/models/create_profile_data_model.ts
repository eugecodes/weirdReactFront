import { toJson } from "@/src/common/utils/transformers";
import { Expose } from "class-transformer";
import type { CreateProfileModel } from "../../domain/models/create_profile_model";

export class CreateProfileDataModel {
  @Expose({ name: "first_name" }) firstName!: string;
  @Expose({ name: "last_name" }) lastName!: string;
  @Expose() email!: string;

  fromDomain(domainObject: CreateProfileModel) {
    this.firstName = domainObject.name;
    this.lastName = domainObject.surname;
    this.email = domainObject.email;
  }

  toJson() {
    return toJson(this);
  }
}
