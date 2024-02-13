import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { ISupplyPointRepository } from "@/src/core/supply_point/domain/interfaces/i_supply_point_repository";
import type { CreateSupplyPointModel } from "@/src/core/supply_point/domain/models/create_supply_point_model";

@injectable()
export class CreateSupplyPointUseCase {
  @inject(TYPES.ISupplyPointRepository) private readonly provider!: IocProvider<ISupplyPointRepository>;

  async execute(input: CreateSupplyPointModel) {
    const repository = await this.provider();
    return repository.create(input);
  }
}
