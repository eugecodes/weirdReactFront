import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { CreateRateModel } from "@/src/core/rate/domain/models/create_rate_model";
import type { IRateRepository } from "@/src/core/rate/domain/interfaces/i_rate_repository";

@injectable()
export class CreateRateUseCase {
  @inject(TYPES.IRateRepository) private readonly provider!: IocProvider<IRateRepository>;

  async execute(input: CreateRateModel) {
    const repository = await this.provider();
    return repository.create(input);
  }
}
