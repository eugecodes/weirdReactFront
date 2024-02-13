import { ClientType } from "@/src/core/app/enums/client_type";
import i18n from ".";
import { isBoolean } from "lodash";
import { CostType } from "@/src/core/app/enums/cost_type";
import { PriceType } from "@/src/core/app/enums/price_type";
import { EnergyTypes } from "@/src/core/app/enums/energy_types";

export function getClientTypeTranslation(value?: ClientType) {
  switch (value) {
    case ClientType.COMMUNITY_OWNERS:
      return i18n.t("clientType.comunityOwners", { ns: "common" });
    case ClientType.COMPANY:
      return i18n.t("clientType.company", { ns: "common" });
    case ClientType.PARTICULAR:
      return i18n.t("clientType.particular", { ns: "common" });
    case ClientType.SELF_EMPLOYED:
      return i18n.t("clientType.selfEmployed", { ns: "common" });
    default:
      return "";
  }
}

export function getCostTypeTranslation(value?: CostType) {
  switch (value) {
    case CostType.EUR_KWH:
      return i18n.t("costType.eurKwh", { ns: "common" });
    case CostType.PERCENTAGE:
      return i18n.t("costType.percentage", { ns: "common" });
    case CostType.EUR_MONTH:
      return i18n.t("costType.eurMonth", { ns: "common" });
    default:
      return "";
  }
}

export function getBooleanTranslation(value?: boolean) {
  if (!isBoolean(value)) {
    return "";
  }

  return value ? i18n.t("yes", { ns: "common" }) : i18n.t("no", { ns: "common" });
}

export function getPriceTypeTranslation(value?: PriceType) {
  if (!value) {
    return "";
  }

  return value === PriceType.FIXED_FIXED ? i18n.t("priceType.fixedFixed", { ns: "common" }) : i18n.t("priceType.fixedBase", { ns: "common" });
}

export function getEnergyTypeTranslation(value?: EnergyTypes) {
  if (!value) {
    return "";
  }

  return value === EnergyTypes.LIGHT ? i18n.t("energyType.electricity", { ns: "common" }) : i18n.t("energyType.gas", { ns: "common" });
}
