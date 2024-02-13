import type { Order } from "@/src/core/app/domain/models/order";
import { ASCENDING } from "@/src/core/app/domain/models/order";

export const ASCENDING_DATA = "+";
export const DESCENDING_DATA = "-";
export type OrderData = typeof ASCENDING_DATA | typeof DESCENDING_DATA;

export const orderFromDomainToData = (value?: Order): OrderData | undefined => {
  if (!value) {
    return;
  }
  return value === ASCENDING ? ASCENDING_DATA : DESCENDING_DATA;
};

export type OrderByData<T> = Record<keyof T, OrderData | undefined>;
