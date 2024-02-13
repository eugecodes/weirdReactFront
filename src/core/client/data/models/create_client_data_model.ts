import { Expose } from "class-transformer";
import type { CreateClientModel } from "@/src/core/client/domain/models/create_client_model";
import { toJson } from "@/src/common/utils/transformers";
import type { ClientType } from "@/src/core/app/enums/client_type";
import type { CreateInlineContactDataModel } from "@/src/core/contact/data/models/create_inline_contact_data_model";

export class CreateClientDataModel {
  @Expose()
  alias!: string;
  @Expose({ name: "client_type" })
  clientType!: ClientType;
  @Expose({ name: "fiscal_name" })
  fiscalName!: string;
  @Expose({ name: "cif" })
  cif!: string;
  @Expose({ name: "invoice_email" })
  invoiceEmail!: string;
  @Expose({ name: "invoice_notification_type" })
  invoiceNotificationType!: string;
  @Expose({ name: "invoice_postal" })
  invoicePostal!: string;
  @Expose({ name: "bank_account_holder" })
  bankAccountHolder!: string;
  @Expose({ name: "bank_account_number" })
  bankAccountNumber!: string;
  @Expose({ name: "fiscal_address" })
  fiscalAddress!: string;
  @Expose({ name: "is_renewable" })
  isRenewable!: boolean;
  @Expose({ name: "main_contact" })
  mainContact!: CreateInlineContactDataModel;

  fromDomain(domainObject: CreateClientModel) {
    this.alias = domainObject.alias;
    this.clientType = domainObject.clientType;
    this.fiscalName = domainObject.fiscalName;
    this.cif = domainObject.cif;
    this.invoiceNotificationType = domainObject.invoiceNotificationType;
    this.invoiceEmail = domainObject.invoiceEmail;
    this.invoicePostal = domainObject.invoicePostal;
    this.bankAccountHolder = domainObject.bankAccountHolder;
    this.bankAccountNumber = domainObject.bankAccountNumber;
    this.fiscalAddress = domainObject.fiscalAddress;
    this.isRenewable = domainObject.isRenewable;
    this.mainContact = domainObject.mainContact;
  }

  toJson() {
    return toJson(this);
  }
}
