import type { Id, Option } from "@/src/common/utils/types";
import type { EnergyTypes } from "@/src/core/app/enums/energy_types";
import type { PriceType } from "@/src/core/app/enums/price_type";
import type { RangeTypes } from "@/src/core/app/enums/range_type";

export interface FormCreateCommissionValues {
  id?: Id;
  marketerId?: Id;
  name: string;
  energyType?: EnergyTypes;
  priceType?: PriceType;
  rateType?: Option;
  rates: Option[];
  minPower?: number;
  maxPower?: number;
  minConsumption?: number;
  maxConsumption?: number;
  percentagetestCommission?: number;
  rateTypeSegmentation?: boolean;
  rangeType?: RangeTypes;
  testCommission?: number;
}
