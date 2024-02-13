import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { IRateTypeRepository } from "@/src/core/rate_type/domain/interfaces/i_rate_type_repository";
import type { Id } from "@/src/common/utils/types";

@injectable()
export class GetRateTypeDetailUseCase {
  @inject(TYPES.IRateTypeRepository) private readonly provider!: IocProvider<IRateTypeRepository>;

  async execute(rateTypeId: Id) {
    const repository = await this.provider();
    return repository.detailRateType(rateTypeId);
  }
}
