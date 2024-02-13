import { inject, injectable } from "inversify";
import { TYPES } from "@/src/core/app/ioc/types";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import type { testApiService } from "@/src/core/app/data/services/test_api_service";
import type { AtLeast, Id } from "@/src/common/utils/types";
import { fromJson, fromJsonPage } from "@/src/common/utils/transformers";
import type { Page } from "@/src/core/app/domain/models/page";
import type { Filters } from "@/src/core/app/domain/models/filters";
import type { IContactRepository } from "@/src/core/contact/domain/interfaces/i_contact_repository";
import type { FilterContactModel } from "@/src/core/contact/domain/models/filter_contact_model";
import type { CreateContactModel } from "@/src/core/contact/domain/models/create_contact_model";
import type { PatchContactModel } from "@/src/core/contact/domain/models/patch_contact_model";
import type { ContactModel } from "@/src/core/contact/domain/models/contact_model";
import { ContactDataModel } from "@/src/core/contact/data/models/contact_data_model";
import { CreateContactDataModel } from "@/src/core/contact/data/models/create_contact_data_model";
import { FiltersContactDataModel } from "@/src/core/contact/data/models/filter_contact_data_model";
import { PatchContactDataModel } from "@/src/core/contact/data/models/patch_contact_data_model";
import type { SortContact } from "@/src/core/contact/domain/interfaces/sort_contact";
import { SortContactDataModel } from "../models/sort_contact_data_model";
import { createFileName, fromFiltersToQueryParams, getExportFormatAsPath, getExportQueryParams } from "@/src/common/utils";
import { DELETE, EXPORT } from "@/src/common/utils/api_paths";
import type { ExportArgumentsModel } from "@/src/core/app/domain/models/export_argument";
import { FileModel } from "@/src/core/app/domain/models/file";
import type { DetailContactModel } from "@/src/core/contact/domain/models/detail_contact_model";
import { DetailContactDataModel } from "@/src/core/contact/data/models/detail_contact_data_model";

@injectable()
export class ContactRepository implements IContactRepository {
  @inject(TYPES.testApiService) private apiServiceProvider!: IocProvider<testApiService>;

  private readonly baseUrl = "/api/contacts";

  private getRouteWithContactId(contactId: Id) {
    return this.baseUrl + "/" + contactId;
  }

  async contacts(input: Filters<FilterContactModel, SortContact>): Promise<Page<ContactModel>> {
    const service = await this.apiServiceProvider();
    const queryParams = fromFiltersToQueryParams({ filters: input, modelClass: FiltersContactDataModel, sortClass: SortContactDataModel });

    const res = await service.get<Record<string, unknown>>(this.baseUrl + queryParams);
    return fromJsonPage<ContactDataModel, ContactModel>(ContactDataModel, res).toDomain();
  }

  async create(input: CreateContactModel): Promise<void> {
    const data = new CreateContactDataModel();
    data.fromDomain(input);
    const service = await this.apiServiceProvider();
    await service.post(this.baseUrl, { data: data.toJson() });
  }

  async detailContact(contactId: Id): Promise<DetailContactModel> {
    const service = await this.apiServiceProvider();
    const response = await service.get(this.getRouteWithContactId(contactId));
    const dataModel = fromJson(DetailContactDataModel, response);
    return dataModel.toDomain();
  }

  async deleteContact(contactId: Id): Promise<void> {
    return await this.deleteMany([contactId]);
  }

  async editContact(input: CreateContactModel, id: Id): Promise<DetailContactModel> {
    const data = new CreateContactDataModel();
    data.fromDomain(input);
    const service = await this.apiServiceProvider();
    const response = await service.put(this.getRouteWithContactId(id), { data: data.toJson() });
    const dataModel = fromJson(DetailContactDataModel, response);
    return dataModel.toDomain();
  }

  async patchContact(input: AtLeast<PatchContactModel, "id">): Promise<ContactModel> {
    const service = await this.apiServiceProvider();
    const data = new PatchContactDataModel();
    data.fromDomain(input);
    const response = await service.patch(this.getRouteWithContactId(input.id), { data: data.toJson() });
    const dataModel = fromJson(ContactDataModel, response);
    return dataModel.toDomain();
  }

  async exportToFile({ filters, ids, format }: ExportArgumentsModel<FilterContactModel, SortContact>): Promise<FileModel> {
    const service = await this.apiServiceProvider();

    const queryParams = getExportQueryParams({ filters, ids, modelClass: FiltersContactDataModel, sortClass: SortContactDataModel });
    const formatAsPath = getExportFormatAsPath(format);

    const data: string = await service.post(this.baseUrl + EXPORT + formatAsPath + queryParams);
    return new FileModel({ data, name: createFileName("saving_studies", format) });
  }

  async deleteMany(ids: Id[]): Promise<void> {
    const service = await this.apiServiceProvider();
    await service.post(this.baseUrl + DELETE, { data: { ids } });
  }
}
