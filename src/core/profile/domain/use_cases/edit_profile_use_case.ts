import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { IProfileRepository } from "@/src/core/profile/domain/interfaces/i_profile_repository";
import type { CreateProfileModel } from "../models/create_profile_model";
import type { Id } from "@/src/common/utils/types";

@injectable()
export class EditProfileUseCase {
  @inject(TYPES.IProfilesRepository) private readonly provider!: IocProvider<IProfileRepository>;

  async execute(input: CreateProfileModel, id: Id) {
    const repository = await this.provider();
    return repository.editProfile(input, id);
  }
}
