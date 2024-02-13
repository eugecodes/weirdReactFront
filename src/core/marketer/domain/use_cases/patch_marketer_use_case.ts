import type { AtLeast, Id } from "@/src/common/utils/types";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { IMarketerRepository } from "@/src/core/marketer/domain/interfaces/i_marketer_repository";
import type { MarketerModel } from "@/src/core/marketer/domain/models/marketer_model";

@injectable()
export class PatchMarketerUseCase {
  @inject(TYPES.IMarketerRepository) private readonly provider!: IocProvider<IMarketerRepository>;

  async execute(input: AtLeast<MarketerModel, "id">) {
    const repository = await this.provider();
    return repository.patchMarketer(input);
  }

  async delete(id: Id) {
    const repository = await this.provider();
    return repository.deleteMarketer(id);
  }

  async toggleEnable(id: Id, newActiveValue: boolean) {
    const repository = await this.provider();
    return repository.patchMarketer({ id, enabled: newActiveValue });
  }
}
