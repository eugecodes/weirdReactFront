import type { RatePrices } from "@/src/core/rate/domain/interfaces/rate_prices";
import FakeInput from "@/src/ui/components/fake_input/fake_input";
import { useTranslation } from "react-i18next";

interface Props {
  prices: RatePrices;
}

export default function GasPriceFakeForm({ prices }: Props) {
  const { t } = useTranslation("rate");
  return (
    <>
      <h2>{t("form.labels.energyPrices")}</h2>
      <div>
        <FakeInput label={t("columns.energyPrice", { price: 1 })} value={prices.energyPrice1} />
      </div>
      <h2>{t("form.labels.fixedTermPrice")}</h2>
      <div>
        <FakeInput label={t("columns.fixedTermPrice")} value={prices.fixedTermPrice} />
      </div>
    </>
  );
}
