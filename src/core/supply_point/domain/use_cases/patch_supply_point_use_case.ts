import type { AtLeast, Id } from "@/src/common/utils/types";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { ISupplyPointRepository } from "@/src/core/supply_point/domain/interfaces/i_supply_point_repository";
import type { PatchSupplyPointModel } from "@/src/core/supply_point/domain/models/patch_supply_point_model";

@injectable()
export class PatchSupplyPointUseCase {
  @inject(TYPES.ISupplyPointRepository) private readonly provider!: IocProvider<ISupplyPointRepository>;

  async execute(input: AtLeast<PatchSupplyPointModel, "id">) {
    const repository = await this.provider();
    return repository.patchSupplyPoint(input);
  }

  async delete(id: Id) {
    const repository = await this.provider();
    return repository.deleteSupplyPoint(id);
  }
}
