import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { ISupplyPointRepository } from "@/src/core/supply_point/domain/interfaces/i_supply_point_repository";
import type { Id } from "@/src/common/utils/types";

@injectable()
export class GetSupplyPointDetailUseCase {
  @inject(TYPES.ISupplyPointRepository) private readonly provider!: IocProvider<ISupplyPointRepository>;

  async execute(rateTypeId: Id) {
    const repository = await this.provider();
    return repository.detailSupplyPoint(rateTypeId);
  }
}
