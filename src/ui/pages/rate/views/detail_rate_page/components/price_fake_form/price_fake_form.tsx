import { EnergyTypes } from "@/src/core/app/enums/energy_types";
import LightPriceForm from "../light_price_fake_form/light_price_fake_form";
import GasPriceForm from "../gas_price_fake_form/gas_price_fake_form";
import Styled from "./price_fake_form.styled";
import type { RatePrices } from "@/src/core/rate/domain/interfaces/rate_prices";

interface Props {
  energyType: EnergyTypes;
  prices: RatePrices;
}

export function RatePriceFakeForm({ energyType, prices }: Props) {
  return (
    <Styled.RatePriceFormGrid>
      {energyType === EnergyTypes.LIGHT ? <LightPriceForm prices={prices} /> : <GasPriceForm prices={prices} />}
    </Styled.RatePriceFormGrid>
  );
}
