import { ClientType } from "@/src/core/app/enums/client_type";
import { CostType } from "@/src/core/app/enums/cost_type";
import { MarginType } from "@/src/core/app/enums/margin_type";
import { PriceType } from "@/src/core/app/enums/price_type";
import { EnergyTypes } from "@/src/core/app/enums/energy_types";
import i18n from "@/src/ui/i18n";
import { RangeTypes } from "@/src/core/app/enums/range_type";
import { StudyStatus } from "@/src/core/app/enums/study_status";
import { InvoiceNotificationType } from "@/src/core/app/enums/invoice_notification_type";
import { CounterTypes } from "@/src/core/app/enums/counter_types";
import { OwnerTypes } from "@/src/core/app/enums/owner_types";
import { ContractStatus } from "@/src/core/app/enums/contract_status";

export const energyTypeOptions = [
  { label: i18n.t("energyType.electricity", { ns: "common" }), value: EnergyTypes.LIGHT },
  { label: i18n.t("energyType.gas", { ns: "common" }), value: EnergyTypes.GAS }
];

export const priceTypeOptions = [
  { label: i18n.t("priceType.fixedFixed", { ns: "common" }), value: PriceType.FIXED_FIXED },
  { label: i18n.t("priceType.fixedBase", { ns: "common" }), value: PriceType.FIXED_BASE }
];

export const clientTypeOptions = [
  { label: i18n.t("clientType.selfEmployed", { ns: "common" }), value: ClientType.SELF_EMPLOYED },
  { label: i18n.t("clientType.company", { ns: "common" }), value: ClientType.COMPANY },
  { label: i18n.t("clientType.comunityOwners", { ns: "common" }), value: ClientType.COMMUNITY_OWNERS },
  { label: i18n.t("clientType.particular", { ns: "common" }), value: ClientType.PARTICULAR }
];

export const statusOptions = [
  { value: true, label: i18n.t("status.enabled", { ns: "common" }) },
  { value: false, label: i18n.t("status.disabled", { ns: "common" }) }
];

export const booleanOptions = [
  { value: true, label: i18n.t("yes", { ns: "common" }) },
  { value: false, label: i18n.t("no", { ns: "common" }) }
];

export const marginOptions = [
  { value: MarginType.CONSUME_RANGE, label: i18n.t("marginType.consumeRange", { ns: "common" }) },
  { value: MarginType.RATE_TYPE, label: i18n.t("marginType.rateType", { ns: "common" }) }
];

export const costOptions = [
  { value: CostType.EUR_KWH, label: i18n.t("costType.eurKwh", { ns: "common" }) },
  { value: CostType.EUR_MONTH, label: i18n.t("costType.eurMonth", { ns: "common" }) },
  { value: CostType.PERCENTAGE, label: i18n.t("costType.percentage", { ns: "common" }) }
];

export const rangeTypeOptions = [
  { value: RangeTypes.POWER, label: i18n.t("rangeType.power", { ns: "common" }) },
  { value: RangeTypes.CONSUMPTION, label: i18n.t("rangeType.consumption", { ns: "common" }) }
];

export const studyStatusOptions = [
  { label: i18n.t("studyStatus.completed", { ns: "common" }), value: StudyStatus.COMPLETED },
  { label: i18n.t("studyStatus.inProgress", { ns: "common" }), value: StudyStatus.IN_PROGRESS }
];

export const invoiceNotificationTypeOptions = [
  { label: i18n.t("invoiceNotificationType.email", { ns: "common" }), value: InvoiceNotificationType.EMAIL },
  { label: i18n.t("invoiceNotificationType.postal", { ns: "common" }), value: InvoiceNotificationType.POSTAL }
];

export const counterTypeOptions = [
  { label: i18n.t("counterType.normal", { ns: "common" }), value: CounterTypes.NORMAL },
  { label: i18n.t("counterType.telematic", { ns: "common" }), value: CounterTypes.TELEMATIC }
];

export const ownerTypeOptions = [
  { label: i18n.t("ownerType.self", { ns: "common" }), value: OwnerTypes.SELF },
  { label: i18n.t("ownerType.marketer", { ns: "common" }), value: OwnerTypes.MARKETER },
  { label: i18n.t("ownerType.other", { ns: "common" }), value: OwnerTypes.OTHER }
];

export const ContractStatusOptions = [
  { label: i18n.t("contractStatus.incomplete", { ns: "common" }), value: ContractStatus.INCOMPLETE },
  { label: i18n.t("contractStatus.requested", { ns: "common" }), value: ContractStatus.REQUESTED },
  { label: i18n.t("contractStatus.waiting-marketer", { ns: "common" }), value: ContractStatus.WAITING_MARKETER },
  { label: i18n.t("contractStatus.waiting-client-sign", { ns: "common" }), value: ContractStatus.WAITING_CLIENT_SIGN },
  { label: i18n.t("contractStatus.signed", { ns: "common" }), value: ContractStatus.SIGNED },
  { label: i18n.t("contractStatus.activated", { ns: "common" }), value: ContractStatus.ACTIVATED },
  { label: i18n.t("contractStatus.finished", { ns: "common" }), value: ContractStatus.FINISHED },
  { label: i18n.t("contractStatus.marketer-issue", { ns: "common" }), value: ContractStatus.MARKETER_ISSUE },
  { label: i18n.t("contractStatus.distributor-issue", { ns: "common" }), value: ContractStatus.DISTRIBUTOR_ISSUE },
  { label: i18n.t("contractStatus.cancelled", { ns: "common" }), value: ContractStatus.CANCELLED }
];
