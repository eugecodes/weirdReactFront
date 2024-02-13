import type { Id } from "@/src/common/utils/types";
import paths from "@/src/ui/router/paths";
import type { MARKETER_TABS_QUERY_PARAMS } from "@/src/ui/pages/marketer/views/detail_marketer_page/detail_marketer_page";
import { ContractStatus } from "@/src/core/app/enums/contract_status";
import { t } from "i18next";

export const getTabResourcePath = (tab: MARKETER_TABS_QUERY_PARAMS, marketerId?: Id) =>
  paths.marketer.index + paths.marketer.detail + marketerId + "?tab=" + tab;

export const getContractStatus = (value: string) => {
  switch (value) {
    case ContractStatus.INCOMPLETE:
      return t("common:contractStatus.incomplete");
    case ContractStatus.REQUESTED:
      return t("common:contractStatus.requested");
    case ContractStatus.WAITING_MARKETER:
      return t("common:contractStatus.waiting-marketer");
    case ContractStatus.WAITING_CLIENT_SIGN:
      return t("common:contractStatus.waiting-client-sign");
    case ContractStatus.SIGNED:
      return t("common:contractStatus.signed");
    case ContractStatus.ACTIVATED:
      return t("common:contractStatus.activated");
    case ContractStatus.FINISHED:
      return t("common:contractStatus.finished");
    case ContractStatus.MARKETER_ISSUE:
      return t("common:contractStatus.marketer-issue");
    case ContractStatus.DISTRIBUTOR_ISSUE:
      return t("common:contractStatus.distributor-issue");
    case ContractStatus.CANCELLED:
      return t("common:contractStatus.cancelled");
    default:
    // code block
  }
};
