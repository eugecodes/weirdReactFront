import type { Id } from "@/src/common/utils/types";
import type { EnergyTypes } from "@/src/core/app/enums/energy_types";

export class CreateSavingStudyConfigurationModel {
  id?: Id;
  cups: string;
  energyType: EnergyTypes;
  isExistingClient: boolean;
  isFromSIPS: boolean;
  isCompareConditions: boolean;

  constructor(configuration: {
    id?: Id;
    cups: string;
    energyType: EnergyTypes;
    isExistingClient: boolean;
    isFromSIPS: boolean;
    isCompareConditions: boolean;
  }) {
    this.id = configuration.id;
    this.cups = configuration.cups;
    this.energyType = configuration.energyType;
    this.isExistingClient = configuration.isExistingClient;
    this.isFromSIPS = configuration.isFromSIPS;
    this.isCompareConditions = configuration.isCompareConditions;
  }
}
