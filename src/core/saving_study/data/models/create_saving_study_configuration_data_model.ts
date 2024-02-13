import type { EnergyTypes } from "@/src/core/app/enums/energy_types";
import { Expose } from "class-transformer";
import { CreateSavingStudyConfigurationModel } from "@/src/core/saving_study/domain/models/create_saving_study_configuration_model";
import { toJson } from "@/src/common/utils/transformers";
import type { Id } from "@/src/common/utils/types";

export class CreateSavingStudyConfigurationDataModel {
  @Expose()
  id?: Id;
  @Expose()
  cups!: string;
  @Expose({ name: "energy_type" })
  energyType!: EnergyTypes;
  @Expose({ name: "is_existing_client" })
  isExistingClient!: boolean;
  @Expose({ name: "is_from_sips" })
  isFromSIPS!: boolean;
  @Expose({ name: "is_compare_conditions" })
  isCompareConditions!: boolean;

  fromDomain(fromDomain: CreateSavingStudyConfigurationModel) {
    this.cups = fromDomain.cups;
    this.energyType = fromDomain.energyType;
    this.isExistingClient = fromDomain.isExistingClient;
    this.isFromSIPS = fromDomain.isFromSIPS;
    this.isCompareConditions = fromDomain.isCompareConditions;
  }

  toDomain(): CreateSavingStudyConfigurationModel {
    return new CreateSavingStudyConfigurationModel({
      id: this.id,
      cups: this.cups,
      energyType: this.energyType,
      isExistingClient: this.isExistingClient,
      isFromSIPS: this.isFromSIPS,
      isCompareConditions: this.isCompareConditions
    });
  }

  toJson() {
    return toJson(this);
  }
}
