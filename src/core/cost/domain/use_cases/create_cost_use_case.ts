import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { CreateCostModel } from "@/src/core/cost/domain/models/create_cost_model";
import type { ICostRepository } from "@/src/core/cost/domain/interfaces/i_cost_repository";

@injectable()
export class CreateCostUseCase {
  @inject(TYPES.ICostRepository) private readonly provider!: IocProvider<ICostRepository>;

  async execute(input: CreateCostModel) {
    const repository = await this.provider();
    return repository.create(input);
  }
}
