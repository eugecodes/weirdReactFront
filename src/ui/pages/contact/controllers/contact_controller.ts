import type { Filters } from "@/src/core/app/domain/models/filters";
import { locator } from "@/src/core/app/ioc";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import { TYPES } from "@/src/core/app/ioc/types";
import type { CreateContactModel } from "@/src/core/contact/domain/models/create_contact_model";
import type { FilterContactModel } from "@/src/core/contact/domain/models/filter_contact_model";
import type { SortContact } from "@/src/core/contact/domain/interfaces/sort_contact";
import type { CreateContactUseCase } from "@/src/core/contact/domain/use_cases/create_contact_use_case";
import type { GetContactDetailUseCase } from "@/src/core/contact/domain/use_cases/get_contact_detail_use_case";
import type { PatchContactUseCase } from "@/src/core/contact/domain/use_cases/patch_contact_use_case";
import type { EditContactUseCase } from "@/src/core/contact/domain/use_cases/edit_contact_use_case";
import type { Id } from "@/src/common/utils/types";
import type { DeleteManyContactsUseCase } from "@/src/core/contact/domain/use_cases/delete_many_contacts_use_case";
import type { ExportContactsUseCase } from "@/src/core/contact/domain/use_cases/export_contacts_use_case";
import type { ListController } from "@/src/common/interfaces/list_controller";
import type { ContactModel } from "@/src/core/contact/domain/models/contact_model";
import type { MutationController } from "@/src/common/interfaces/mutation_controller";
import { withErrorHandler } from "@/src/common/utils/errors";
import { ExportArgumentsModel } from "@/src/core/app/domain/models/export_argument";
import type { GetContactsUseCase } from "@/src/core/contact/domain/use_cases/get_contacts_use_case";

export default class ContactController implements ListController<ContactModel, FilterContactModel, SortContact>, MutationController<ContactModel> {
  async getAll(filter: Filters<FilterContactModel, SortContact>) {
    const contactsUseCase = await locator.get<IocProvider<GetContactsUseCase>>(TYPES.GetContactsUseCase)();
    return await withErrorHandler(contactsUseCase.execute(filter));
  }

  async getOneById(id: Id) {
    const getContactUseCase = await locator.get<IocProvider<GetContactDetailUseCase>>(TYPES.GetContactDetailUseCase)();
    return await withErrorHandler(getContactUseCase.execute(id));
  }

  static async create(input: CreateContactModel) {
    const createContactUseCase = await locator.get<IocProvider<CreateContactUseCase>>(TYPES.CreateContactUseCase)();
    return await withErrorHandler(createContactUseCase.execute(input));
  }

  static async edit(input: CreateContactModel, id: Id) {
    const editContactUseCase = await locator.get<IocProvider<EditContactUseCase>>(TYPES.EditContactUseCase)();
    return withErrorHandler(editContactUseCase.execute(input, id));
  }

  static async delete(id: Id) {
    const patchUseCase = await locator.get<IocProvider<PatchContactUseCase>>(TYPES.PatchContactUseCase)();
    await withErrorHandler(patchUseCase.delete(id));
  }

  async deleteMany(ids: Id[]) {
    const deleteManyUseCase = await locator.get<IocProvider<DeleteManyContactsUseCase>>(TYPES.DeleteManyContactUseCase)();
    await withErrorHandler(deleteManyUseCase.execute(ids));
  }

  async export({ filters, ids }: ExportArgumentsModel<FilterContactModel, SortContact>) {
    const exportUseCase = await locator.get<IocProvider<ExportContactsUseCase>>(TYPES.ExportContactUseCase)();
    const exportArguments = new ExportArgumentsModel({ filters, ids });
    return await withErrorHandler(exportUseCase.execute(exportArguments));
  }
}
