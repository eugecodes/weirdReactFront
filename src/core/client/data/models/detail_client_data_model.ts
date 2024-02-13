import { fromDataDateStringToDomainDate } from "@/src/common/utils/dates";
import { toJson } from "@/src/common/utils/transformers";
import { Expose, Type } from "class-transformer";
import type { Id } from "@/src/common/utils/types";
import { UserDataModel } from "@/src/core/user/data/models/user_data_model";
import type { ClientType } from "@/src/core/app/enums/client_type";
import { DetailClientModel } from "@/src/core/client/domain/models/detail_client_model";
import type { InvoiceNotificationType } from "@/src/core/app/enums/invoice_notification_type";

export class DetailClientDataModel {
  @Expose()
  id!: Id;
  @Expose()
  alias!: string;
  @Expose({ name: "fiscal_name" })
  fiscalName!: string;
  @Expose({ name: "client_type" })
  clientType!: ClientType;
  @Expose({ name: "cif" })
  cif!: string;
  @Expose({ name: "invoice_notification_type" })
  invoiceNotificationType!: InvoiceNotificationType;
  @Expose({ name: "invoice_email" })
  invoiceEmail!: string;
  @Expose({ name: "invoice_postal" })
  invoicePostal!: string;
  @Expose({ name: "bank_account_holder" })
  bankAccountHolder!: string;
  @Expose({ name: "bank_account_number" })
  bankAccountNumber!: string;
  @Expose({ name: "fiscal_address" })
  fiscalAddress!: string;
  @Expose({ name: "create_at" })
  createdAt!: string;
  @Expose({ name: "user_creator" })
  @Type(() => UserDataModel)
  user!: UserDataModel;
  @Expose({ name: "is_active" })
  isActive!: boolean;
  @Expose({ name: "is_renewable" })
  isRenewable!: boolean;

  toDomain(): DetailClientModel {
    return new DetailClientModel({
      id: this.id,
      isActive: this.isActive,
      alias: this.alias,
      clientType: this.clientType,
      fiscalName: this.fiscalName,
      cif: this.cif,
      invoiceNotificationType: this.invoiceNotificationType,
      invoiceEmail: this.invoiceEmail,
      invoicePostal: this.invoicePostal,
      bankAccountHolder: this.bankAccountHolder,
      bankAccountNumber: this.bankAccountNumber,
      fiscalAddress: this.fiscalAddress,
      isRenewable: this.isRenewable,
      createdAt: fromDataDateStringToDomainDate(this.createdAt),
      user: this.user?.toDomain()
    });
  }

  toJson() {
    return toJson(this);
  }
}
