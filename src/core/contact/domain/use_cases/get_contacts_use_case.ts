import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { Filters } from "@/src/core/app/domain/models/filters";
import type { IContactRepository } from "@/src/core/contact/domain/interfaces/i_contact_repository";
import type { FilterContactModel } from "@/src/core/contact/domain/models/filter_contact_model";
import type { SortContact } from "../interfaces/sort_contact";

@injectable()
export class GetContactsUseCase {
  @inject(TYPES.IContactRepository) private readonly provider!: IocProvider<IContactRepository>;

  async execute(input: Filters<FilterContactModel, SortContact>) {
    const repository = await this.provider();
    return repository.contacts(input);
  }
}
