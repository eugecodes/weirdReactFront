import type { AtLeast, Id } from "@/src/common/utils/types";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { IMarketerMarginRepository } from "@/src/core/marketer_margin/domain/interfaces/i_marketer_margin_repository";
import type { PatchMarketerMarginModel } from "@/src/core/marketer_margin/domain/models/patch_marketer_margin_model";

@injectable()
export class PatchMarketerMarginUseCase {
  @inject(TYPES.IMarketerMarginRepository) private readonly provider!: IocProvider<IMarketerMarginRepository>;

  async execute(input: AtLeast<PatchMarketerMarginModel, "id">) {
    const repository = await this.provider();
    return repository.patchMarketerMargin(input);
  }

  async delete(id: Id) {
    const repository = await this.provider();
    return repository.deleteMarketerMargin(id);
  }
}
