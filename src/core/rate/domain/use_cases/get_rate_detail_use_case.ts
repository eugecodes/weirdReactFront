import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { IRateRepository } from "@/src/core/rate/domain/interfaces/i_rate_repository";
import type { Id } from "@/src/common/utils/types";

@injectable()
export class GetRateDetailUseCase {
  @inject(TYPES.IRateRepository) private readonly provider!: IocProvider<IRateRepository>;

  async execute(rateId: Id) {
    const repository = await this.provider();
    return repository.detailRate(rateId);
  }
}
