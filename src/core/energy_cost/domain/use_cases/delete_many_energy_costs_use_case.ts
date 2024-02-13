import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { IEnergyCostRepository } from "@/src/core/energy_cost/domain/interfaces/i_energy_cost_repository";
import type { Id } from "@/src/common/utils/types";

@injectable()
export class DeleteManyEnergyCostsUseCase {
  @inject(TYPES.IEnergyCostRepository) private readonly provider!: IocProvider<IEnergyCostRepository>;

  async execute(ids: Id[]) {
    const repository = await this.provider();
    return repository.deleteMany(ids);
  }
}
