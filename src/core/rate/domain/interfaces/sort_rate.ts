import type { Order } from "@/src/core/app/domain/models/order";

export interface SortRate {
  marketer?: Order;
  name?: Order;
  energyType?: Order;
  priceType?: Order;
  clientTypes?: Order;
  rateType?: Order;
  permanency?: Order;
  length?: Order;
  isFullRenewable?: Order;
  compensationSurplus?: Order;
  compensationSurplusValue?: Order;
  minPower?: Order;
  maxPower?: Order;
  energyPrice1?: Order;
  energyPrice2?: Order;
  energyPrice3?: Order;
  energyPrice4?: Order;
  energyPrice5?: Order;
  energyPrice6?: Order;
  powerPrice1?: Order;
  powerPrice2?: Order;
  powerPrice3?: Order;
  powerPrice4?: Order;
  powerPrice5?: Order;
  powerPrice6?: Order;
  fixedTermPrice?: Order;
  enabled?: Order;
}
