import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { CreateCommissionModel } from "@/src/core/commission/domain/models/create_commission_model";
import type { ICommissionRepository } from "@/src/core/commission/domain/interfaces/i_commission_repository";

@injectable()
export class CreateCommissionUseCase {
  @inject(TYPES.ICommissionRepository) private readonly provider!: IocProvider<ICommissionRepository>;

  async execute(input: CreateCommissionModel) {
    const repository = await this.provider();
    return repository.create(input);
  }
}
