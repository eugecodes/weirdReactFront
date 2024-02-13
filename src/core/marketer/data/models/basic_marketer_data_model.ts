import { toJson } from "@/src/common/utils/transformers";
import { Expose } from "class-transformer";
import { BasicMarketerModel } from "@/src/core/marketer/domain/models/basic_marketer_model";

export class BasicMarketerDataModel {
  @Expose() id!: number;
  @Expose() name!: string;

  toDomain(): BasicMarketerModel {
    return new BasicMarketerModel({
      id: this.id,
      name: this.name
    });
  }

  fromDomain(domainObject: BasicMarketerModel) {
    this.id = domainObject.id;
    this.name = domainObject.name;
    return this;
  }

  toJson() {
    return toJson(this);
  }
}
