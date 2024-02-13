import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { IMarketerMarginRepository } from "@/src/core/marketer_margin/domain/interfaces/i_marketer_margin_repository";
import type { Id } from "@/src/common/utils/types";

@injectable()
export class GetMarketerMarginDetailUseCase {
  @inject(TYPES.IMarketerMarginRepository) private readonly provider!: IocProvider<IMarketerMarginRepository>;

  async execute(rateTypeId: Id) {
    const repository = await this.provider();
    return repository.detailMarketerMargin(rateTypeId);
  }
}
