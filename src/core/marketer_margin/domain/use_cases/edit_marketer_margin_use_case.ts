import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { IMarketerMarginRepository } from "@/src/core/marketer_margin/domain/interfaces/i_marketer_margin_repository";
import type { CreateMarketerMarginModel } from "@/src/core/marketer_margin/domain/models/create_marketer_margin_model";
import type { Id } from "@/src/common/utils/types";

@injectable()
export class EditMarketerMarginUseCase {
  @inject(TYPES.IMarketerMarginRepository) private readonly provider!: IocProvider<IMarketerMarginRepository>;

  async execute(input: CreateMarketerMarginModel, id: Id) {
    const repository = await this.provider();
    return repository.editMarketerMargin(input, id);
  }
}
