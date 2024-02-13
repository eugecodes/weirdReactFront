import type home from "../i18n/locales/es/home.json";
import type login from "../i18n/locales/es/login.json";
import type common from "../i18n/locales/es/common.json";
import type forgot_password from "../i18n/locales/es/forgot_password.json";
import type reset_password from "../i18n/locales/es/reset_password.json";
import type profile from "../i18n/locales/es/profile.json";
import type rate_type from "../i18n/locales/es/rate_type.json";
import type energy_cost from "../i18n/locales/es/energy_cost.json";
import type sidebar from "../i18n/locales/es/sidebar.json";
import type marketer from "../i18n/locales/es/marketer.json";
import type address from "../i18n/locales/es/address.json";
import type rate from "../i18n/locales/es/rate.json";
import type error from "../i18n/locales/es/error.json";
import type marketer_margin from "../i18n/locales/es/marketer_margin.json";
import type cost from "../i18n/locales/es/cost.json";
import type commission from "../i18n/locales/es/commission.json";
import type saving_study from "../i18n/locales/es/saving_study.json";
import type client from "../i18n/locales/es/client.json";
import type contact from "../i18n/locales/es/contact.json";
import type supply_point from "../i18n/locales/es/supply_point.json";
import type contract from "../i18n/locales/es/contract.json";

declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: {
      home: typeof home;
      login: typeof login;
      common: typeof common;
      forgot_password: typeof forgot_password;
      reset_password: typeof reset_password;
      profile: typeof profile;
      rate_type: typeof rate_type;
      energy_cost: typeof energy_cost;
      sidebar: typeof sidebar;
      marketer: typeof marketer;
      address: typeof address;
      rate: typeof rate;
      error: typeof error;
      marketer_margin: typeof marketer_margin;
      cost: typeof cost;
      commission: typeof commission;
      saving_study: typeof saving_study;
      client: typeof client;
      contact: typeof contact;
      supply_point: typeof supply_point;
      contract: typeof contract;
    };
  }
}
