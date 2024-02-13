import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { ICommissionRepository } from "@/src/core/commission/domain/interfaces/i_commission_repository";
import type { Id } from "@/src/common/utils/types";

@injectable()
export class GetCommissionDetailUseCase {
  @inject(TYPES.ICommissionRepository) private readonly provider!: IocProvider<ICommissionRepository>;

  async execute(rateTypeId: Id) {
    const repository = await this.provider();
    return repository.detailCommission(rateTypeId);
  }
}
