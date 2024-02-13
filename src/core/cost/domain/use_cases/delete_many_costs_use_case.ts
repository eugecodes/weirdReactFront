import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { ICostRepository } from "@/src/core/cost/domain/interfaces/i_cost_repository";
import type { Id } from "@/src/common/utils/types";

@injectable()
export class DeleteManyCostsUseCase {
  @inject(TYPES.ICostRepository) private readonly provider!: IocProvider<ICostRepository>;

  async execute(ids: Id[]) {
    const repository = await this.provider();
    return repository.deleteMany(ids);
  }
}
