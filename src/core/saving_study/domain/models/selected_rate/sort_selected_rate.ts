import type { Order } from "@/src/core/app/domain/models/order";

export interface SortSelectedRate {
  id?: Order;
  marketerName?: Order;
  rateName?: Order;
  hasContractualCommitment?: Order;
  duration?: Order;
  renewable?: Order;
  netMetering?: Order;
  surplusPrice?: Order;
  appliedProfitMargin?: Order;
  finalCost?: Order;
  theoreticalCommission?: Order;
  savingRelative?: Order;
  savingAbsolute?: Order;
}
