import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { CreateRateTypeModel } from "@/src/core/rate_type/domain/models/create_rate_type_model";
import type { IRateTypeRepository } from "@/src/core/rate_type/domain/interfaces/i_rate_type_repository";

@injectable()
export class CreateRateTypeUseCase {
  @inject(TYPES.IRateTypeRepository) private readonly provider!: IocProvider<IRateTypeRepository>;

  async execute(input: CreateRateTypeModel) {
    const repository = await this.provider();
    return repository.create(input);
  }
}
