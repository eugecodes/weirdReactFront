import dayjs from "dayjs";

export const DATE_FORMAT_TO_SHOW = "DD/MM/YYYY";
export const DATE_FORMAT_DATABASE = "YYYY-MM-DD";
export const YEAR_FORMAT = "YYYY";

export const fromDataDateStringToDomainDate = (date: string) => dayjs(date, DATE_FORMAT_DATABASE).format(DATE_FORMAT_TO_SHOW);
export const fromDataDateToDomainDate = (date: Date) => dayjs(date).format(DATE_FORMAT_TO_SHOW);
export const fromDomainDateStringToDataDate = (date: string) => dayjs(date, DATE_FORMAT_TO_SHOW).format(DATE_FORMAT_DATABASE);
export const fromDomainDateToFilterDate = (date: string) => dayjs(date, DATE_FORMAT_TO_SHOW).add(1, "day").toISOString();
export const fromYearToDate = (date: string) => dayjs(date, YEAR_FORMAT).toISOString();
export const fromDataDateToYear = (date: string) => dayjs(date, DATE_FORMAT_DATABASE).format(YEAR_FORMAT);
