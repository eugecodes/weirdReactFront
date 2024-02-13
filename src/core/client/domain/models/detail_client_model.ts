import type { Id } from "@/src/common/utils/types";
import type { ClientType } from "@/src/core/app/enums/client_type";
import type { UserModel } from "@/src/core/user/domain/models/user_model";
import type { ConstructorType } from "@/src/common/interfaces/constructor_type";
import type { InvoiceNotificationType } from "@/src/core/app/enums/invoice_notification_type";

export class DetailClientModel {
  id: Id;
  isActive: boolean;
  alias: string;
  clientType: ClientType;
  fiscalName: string;
  cif: string;
  invoiceNotificationType: InvoiceNotificationType;
  invoiceEmail: string;
  invoicePostal: string;
  bankAccountHolder: string;
  bankAccountNumber: string;
  fiscalAddress: string;
  isRenewable?: boolean;
  createdAt: string;
  user: UserModel;

  constructor(client: ConstructorType<DetailClientModel>) {
    this.id = client.id;
    this.isActive = client.isActive;
    this.alias = client.alias;
    this.clientType = client.clientType;
    this.fiscalName = client.fiscalName;
    this.cif = client.cif;
    this.invoiceNotificationType = client.invoiceNotificationType;
    this.invoiceEmail = client.invoiceEmail;
    this.invoicePostal = client.invoicePostal;
    this.bankAccountHolder = client.bankAccountHolder;
    this.bankAccountNumber = client.bankAccountNumber;
    this.fiscalAddress = client.fiscalAddress;
    this.isRenewable = client.isRenewable;
    this.createdAt = client.createdAt;
    this.user = client.user;
  }

  creationData() {
    return {
      createdAt: this.createdAt,
      createdBy: this.user?.name || ""
    };
  }
}
