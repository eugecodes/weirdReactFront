import type { AtLeast, Id } from "@/src/common/utils/types";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { IProfileRepository } from "@/src/core/profile/domain/interfaces/i_profile_repository";
import type { ProfileModel } from "@/src/core/profile/domain/models/profile_model";

@injectable()
export class PatchProfileUseCase {
  @inject(TYPES.IProfilesRepository) private readonly provider!: IocProvider<IProfileRepository>;

  async execute(input: AtLeast<ProfileModel, "id">) {
    const repository = await this.provider();
    return repository.patchProfile(input);
  }

  async delete(id: Id) {
    const repository = await this.provider();
    return repository.deleteProfile(id);
  }

  async toggleEnable(id: Id, newActiveValue: boolean) {
    const repository = await this.provider();
    return repository.patchProfile({ id, enabled: newActiveValue });
  }

  async changePassword(id: Id, password: string) {
    const repository = await this.provider();
    return repository.changePassword(id, password);
  }
}
