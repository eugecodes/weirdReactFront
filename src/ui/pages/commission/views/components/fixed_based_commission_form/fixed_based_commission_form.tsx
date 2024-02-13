import { PriceType } from "@/src/core/app/enums/price_type";
import { InputFormik } from "@/src/ui/components/input/input";
import { useTranslation } from "react-i18next";

interface Props {
  priceType?: PriceType;
}

export default function FixedBasedCommissionForm({ priceType }: Props) {
  const { t } = useTranslation("commission");

  return priceType === PriceType.FIXED_BASE ? (
    <InputFormik
      label={t("columns.percentagetestCommission")}
      id="percentagetestCommission"
      name="percentagetestCommission"
      type="number"
    />
  ) : null;
}
