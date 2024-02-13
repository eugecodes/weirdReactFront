import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { IMarketerRepository } from "@/src/core/marketer/domain/interfaces/i_marketer_repository";
import type { CreateMarketerModel } from "@/src/core/marketer/domain/models/create_marketer_model";

@injectable()
export class CreateMarketerUseCase {
  @inject(TYPES.IMarketerRepository) private readonly provider!: IocProvider<IMarketerRepository>;

  async execute(input: CreateMarketerModel) {
    const repository = await this.provider();
    return repository.create(input);
  }
}
