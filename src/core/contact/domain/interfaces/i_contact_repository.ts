import type { AtLeast, Id } from "@/src/common/utils/types";
import type { Page } from "@/src/core/app/domain/models/page";
import type { Filters } from "@/src/core/app/domain/models/filters";
import type { FilterContactModel } from "@/src/core/contact/domain/models/filter_contact_model";
import type { CreateContactModel } from "@/src/core/contact/domain/models/create_contact_model";
import type { EditContactModel } from "@/src/core/contact/domain/models/edit_contact_model";
import type { PatchContactModel } from "@/src/core/contact/domain/models/patch_contact_model";
import type { ContactModel } from "@/src/core/contact/domain/models/contact_model";
import type { SortContact } from "./sort_contact";
import type { ExportArgumentsModel } from "@/src/core/app/domain/models/export_argument";
import type { FileModel } from "@/src/core/app/domain/models/file";
import type { DetailContactModel } from "@/src/core/contact/domain/models/detail_contact_model";

export interface IContactRepository {
  contacts(filters: Filters<FilterContactModel, SortContact>): Promise<Page<ContactModel>>;
  create(input: CreateContactModel): Promise<void>;
  detailContact(contactId: Id): Promise<DetailContactModel>;
  editContact(input: EditContactModel, id: Id): Promise<DetailContactModel>;
  patchContact(input: AtLeast<PatchContactModel, "id">): Promise<ContactModel>;
  deleteContact(contactId: Id): Promise<void>;
  deleteMany(ids: Id[]): Promise<void>;
  exportToFile(filter: ExportArgumentsModel<FilterContactModel, SortContact>): Promise<FileModel>;
}
