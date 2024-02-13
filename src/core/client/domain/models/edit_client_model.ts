import type { ClientType } from "@/src/core/app/enums/client_type";
import type { InvoiceNotificationType } from "@/src/core/app/enums/invoice_notification_type";

export class EditClientModel {
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
  isRenewable: boolean;

  constructor(client: {
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
    isRenewable: boolean;
  }) {
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
  }
}
