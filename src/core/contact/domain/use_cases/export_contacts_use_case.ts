import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import { inject, injectable } from "inversify";
import type { IContactRepository } from "@/src/core/contact/domain/interfaces/i_contact_repository";
import type { FilterContactModel } from "@/src/core/contact/domain/models/filter_contact_model";
import type { SortContact } from "@/src/core/contact/domain/interfaces/sort_contact";
import type { ExportArgumentsModel } from "@/src/core/app/domain/models/export_argument";

@injectable()
export class ExportContactsUseCase {
  @inject(TYPES.IContactRepository) private readonly provider!: IocProvider<IContactRepository>;

  async execute(filter: ExportArgumentsModel<FilterContactModel, SortContact>) {
    const repository = await this.provider();
    return repository.exportToFile(filter);
  }
}
