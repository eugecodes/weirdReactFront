/* This cannot be "/add" becuase it will be harder to use once we navigate */
export const CREATE_PAGE_PATH = "add/";
export const DETAIL_PAGE_PATH = "detail/";
export const EDIT_PAGE_PATH = "edit/";
export const WILDCARD_PATH = "/*";

export default {
  auth: {
    login: "/login",
    forgotPassword: "/forgot-password",
    resetPassword: "/reset-password"
  },
  home: "/",
  profile: {
    index: "/profile",
    detail: "/" + DETAIL_PAGE_PATH,
    create: "/" + CREATE_PAGE_PATH,
    edit: "/" + EDIT_PAGE_PATH,
    changePassword: "/change-password/"
  },
  rateType: {
    index: "/rate-type",
    detail: "/" + DETAIL_PAGE_PATH,
    create: "/" + CREATE_PAGE_PATH,
    edit: "/" + EDIT_PAGE_PATH
  },
  energyCost: {
    index: "/energy-cost",
    detail: "/" + DETAIL_PAGE_PATH,
    create: "/" + CREATE_PAGE_PATH,
    edit: "/" + EDIT_PAGE_PATH
  },
  marketer: {
    index: "/marketer",
    detail: "/" + DETAIL_PAGE_PATH,
    create: "/" + CREATE_PAGE_PATH,
    edit: "/" + EDIT_PAGE_PATH
  },
  rate: {
    index: "/rate",
    light: "/light",
    gas: "/gas",
    detail: "/" + DETAIL_PAGE_PATH,
    create: "/" + CREATE_PAGE_PATH,
    edit: "/" + EDIT_PAGE_PATH
  },
  marketerMargin: {
    index: "/marketer-margin",
    detail: "/" + DETAIL_PAGE_PATH,
    create: "/" + CREATE_PAGE_PATH,
    edit: "/" + EDIT_PAGE_PATH
  },
  cost: {
    index: "/cost",
    detail: "/" + DETAIL_PAGE_PATH,
    create: "/" + CREATE_PAGE_PATH,
    edit: "/" + EDIT_PAGE_PATH
  },
  commission: {
    index: "/commission",
    detail: "/" + DETAIL_PAGE_PATH,
    create: "/" + CREATE_PAGE_PATH,
    edit: "/" + EDIT_PAGE_PATH
  },
  savingStudy: {
    index: "/saving-study",
    detail: "/" + DETAIL_PAGE_PATH,
    create: "/" + CREATE_PAGE_PATH,
    edit: "/" + EDIT_PAGE_PATH,
    selectRate: "/select-rate"
  },
  client: {
    index: "/client",
    detail: "/" + DETAIL_PAGE_PATH,
    create: "/" + CREATE_PAGE_PATH,
    edit: "/" + EDIT_PAGE_PATH
  },
  contact: {
    index: "/contact",
    detail: "/" + DETAIL_PAGE_PATH,
    create: "/" + CREATE_PAGE_PATH,
    edit: "/" + EDIT_PAGE_PATH
  },
  supplyPoint: {
    index: "/supply-point",
    detail: "/" + DETAIL_PAGE_PATH,
    create: "/" + CREATE_PAGE_PATH,
    edit: "/" + EDIT_PAGE_PATH
  },
  contract: {
    index: "/contract",
    detail: "/" + DETAIL_PAGE_PATH,
    create: "/" + CREATE_PAGE_PATH,
    status: "/status/",
    edit: "/" + EDIT_PAGE_PATH
  }
};
