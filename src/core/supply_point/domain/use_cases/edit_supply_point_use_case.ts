import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { ISupplyPointRepository } from "@/src/core/supply_point/domain/interfaces/i_supply_point_repository";
import type { Id } from "@/src/common/utils/types";
import type { EditSupplyPointModel } from "@/src/core/supply_point/domain/models/edit_supply_point_model";

@injectable()
export class EditSupplyPointUseCase {
  @inject(TYPES.ISupplyPointRepository) private readonly provider!: IocProvider<ISupplyPointRepository>;

  async execute(input: EditSupplyPointModel, id: Id) {
    const repository = await this.provider();
    return repository.editSupplyPoint(input, id);
  }
}
