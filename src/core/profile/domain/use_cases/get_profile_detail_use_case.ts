import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { IProfileRepository } from "@/src/core/profile/domain/interfaces/i_profile_repository";
import type { Id } from "@/src/common/utils/types";

@injectable()
export class GetProfileDetailUseCase {
  @inject(TYPES.IProfilesRepository) private readonly provider!: IocProvider<IProfileRepository>;

  async execute(profileId: Id) {
    const repository = await this.provider();
    return repository.detailProfile(profileId);
  }
}
