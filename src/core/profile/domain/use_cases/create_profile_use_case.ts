import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { IProfileRepository } from "@/src/core/profile/domain/interfaces/i_profile_repository";
import type { CreateProfileModel } from "@/src/core/profile/domain/models/create_profile_model";

@injectable()
export class CreateProfileUseCase {
  @inject(TYPES.IProfilesRepository) private readonly provider!: IocProvider<IProfileRepository>;

  async execute(input: CreateProfileModel) {
    const repository = await this.provider();
    return repository.create(input);
  }
}
