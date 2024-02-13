import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { IMarketerRepository } from "@/src/core/marketer/domain/interfaces/i_marketer_repository";
import type { EditMarketerModel } from "@/src/core/marketer/domain/models/edit_marketer_model";
import type { Id } from "@/src/common/utils/types";

@injectable()
export class EditMarketerUseCase {
  @inject(TYPES.IMarketerRepository) private readonly provider!: IocProvider<IMarketerRepository>;

  async execute(input: EditMarketerModel, id: Id) {
    const repository = await this.provider();
    return repository.editMarketer(input, id);
  }
}
