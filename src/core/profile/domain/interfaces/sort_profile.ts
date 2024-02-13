import type { Order } from "@/src/core/app/domain/models/order";

export interface SortProfile {
  name?: Order;
  surnames?: Order;
  email?: Order;
  role?: Order;
  enabled?: Order;
  createdAt?: Order;
  responsible?: Order;
}
