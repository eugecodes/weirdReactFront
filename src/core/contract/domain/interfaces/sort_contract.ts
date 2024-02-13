import type { Order } from "@/src/core/app/domain/models/order";

export interface SortContract {
  id?: Order;
  alias?: Order;
  energyType?: Order;
  supplyPostalCode?: Order;
  supplyCity?: Order;
  supplyProvince?: Order;
  createdAt?: Order;
  user?: Order;
}
