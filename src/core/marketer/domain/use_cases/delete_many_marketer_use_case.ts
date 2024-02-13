import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { IMarketerRepository } from "@/src/core/marketer/domain/interfaces/i_marketer_repository";
import type { Id } from "@/src/common/utils/types";

@injectable()
export class DeleteManyMarketerUseCase {
  @inject(TYPES.IMarketerRepository) private readonly provider!: IocProvider<IMarketerRepository>;

  async execute(ids: Id[]) {
    const repository = await this.provider();
    return repository.deleteMany(ids);
  }
}
