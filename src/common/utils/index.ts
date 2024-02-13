/* eslint-disable @typescript-eslint/no-explicit-any */
import { FiltersDataModel } from "@/src/core/app/data/models/filters_data_model";
import type { Filters } from "@/src/core/app/domain/models/filters";
import type { ExportFormat } from "./export_format";
import { toJson } from "./transformers";
import type { Id } from "./types";

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const emptyFunction = function () {};

export const emptyFunctionWithReturn = () => true;

export const emptyString = "";

export const getUUID = () =>
  (String(1e7) + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (Number(c) ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(c) / 4)))).toString(16)
  );

export const DEFAULT_DEBOUNCE_TIME = 600;
export const MAX_PRICES = 6;

export function fromSortObjectToOrderQueryParam<T>(sortObject: T) {
  const SORT_JOIN = ",";
  const ORDER_BY_QUERY_PARAM = "order_by=";
  const objectAsJson = toJson(sortObject);
  const sortValues = [];

  for (const key in objectAsJson) {
    const value = objectAsJson[key];
    if (value) {
      const valueAsString = `${objectAsJson[key]}${key}`;
      sortValues.push(valueAsString);
    }
  }

  if (sortValues.length) {
    return ORDER_BY_QUERY_PARAM + sortValues.join(SORT_JOIN);
  }

  return "";
}

export function getExportQueryParams<T, S>({
  filters,
  ids,
  modelClass,
  sortClass
}: {
  filters?: Filters<T, S>;
  ids?: Id[];
  modelClass: new (...args: any[]) => T;
  sortClass: new (...args: any[]) => any;
}) {
  let queryParams = "";
  if (filters) {
    queryParams = fromFiltersToQueryParams({ filters, modelClass, sortClass });
  }
  if (ids && Array.isArray(ids)) {
    queryParams = fromListIdToQueryParams(ids);
  }

  return queryParams;
}

export function fromFiltersToQueryParams<T, S>({
  filters,
  modelClass,
  sortClass
}: {
  filters: Filters<T, S>;
  modelClass: new (...args: any[]) => T;
  sortClass: new (...args: any[]) => any;
}) {
  const filtersModel = new FiltersDataModel(modelClass, sortClass);
  filtersModel.fromDomain(filters);
  return filtersModel.toQueryParams();
}

export function fromListIdToQueryParams(ids: Id[]) {
  const idsAsParams = new URLSearchParams({ id__in: ids.join(",") });
  return "?" + idsAsParams.toString();
}

export function getExportFormatAsPath(exportType: ExportFormat) {
  return "/" + exportType;
}

export function createFileName(name: string, format: ExportFormat) {
  return `${name}.${format}`;
}

export function fromValueToString(value: any) {
  return isEmptyValue(value) ? emptyString : String(value);
}

export function isEmptyValue(value: any) {
  if (Array.isArray(value) && !value.length) {
    return true;
  }

  return value?.valueOf() === undefined || value === emptyString;
}

export function isObject(value: any) {
  return value != null && value.constructor.name === "Object";
}

export function removeNullishValuesFromAnObject(value: any) {
  const objectWithoutNullishValues: typeof value = {};

  Object.keys(value).forEach((property) => {
    const propertyValue = value[property];

    if (isObject(propertyValue)) {
      const innerObject = removeNullishValuesFromAnObject(propertyValue);
      objectWithoutNullishValues[property] = innerObject;
    }

    if (!isEmptyValue(propertyValue) && !isObject(propertyValue)) {
      objectWithoutNullishValues[property] = propertyValue;
    }
  });

  return objectWithoutNullishValues;
}

export function isEnumType<T extends { [s: string]: unknown }>(value: any, enumType: T) {
  if (!value) {
    return false;
  }

  return Object.values(enumType).reduce((isValid: boolean, enumValue: any) => isValid || value === enumValue, false);
}

export function convertBooleanStringIntoBoolean(boolString: string | null) {
  if (!boolString) {
    return false;
  }
  return /true/i.test(boolString);
}

export function convertNumberIntoString(number: number | null | undefined) {
  if (!number && number !== 0) {
    return emptyString;
  }
  return String(number);
}
