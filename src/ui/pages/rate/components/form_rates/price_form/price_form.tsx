import { EnergyTypes } from "@/src/core/app/enums/energy_types";
import LightPriceForm from "../light_price_form/light_price_form";
import GasPriceForm from "../gas_price_form/gas_price_form";
import Styled from "./price_form.styled";

interface Props {
  className?: string;
  energyType: EnergyTypes;
}

export function RatePriceForm({ className = "", energyType }: Props) {
  return <div className={className}>{energyType === EnergyTypes.LIGHT ? <LightPriceForm /> : <GasPriceForm />}</div>;
}

export const RatePriceFormFlex = Styled.RatePriceFormFlex;
export const RatePriceFormGrid = Styled.RatePriceFormGrid;
