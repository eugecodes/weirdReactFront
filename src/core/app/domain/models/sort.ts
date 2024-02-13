import type { Order } from "@/src/core/app/domain/models/order";

export interface Sort<T> {
  key: keyof T;
  value: Order;
}
