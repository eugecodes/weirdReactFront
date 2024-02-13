import type { RatePrices } from "@/src/core/rate/domain/interfaces/rate_prices";
import FakeInput from "@/src/ui/components/fake_input/fake_input";
import { useTranslation } from "react-i18next";

interface Props {
  prices: RatePrices;
}

export default function LightPriceFakeForm({ prices }: Props) {
  const { t } = useTranslation("rate");

  return (
    <>
      <h2>{t("form.labels.energyPrices")}</h2>
      <div>
        {Array.from({ length: 6 }).map((_, i) => {
          const current = i + 1;
          return (
            <FakeInput
              key={current}
              label={t("columns.energyPrice", { price: current })}
              value={prices[("energyPrice" + current) as keyof RatePrices]}
            />
          );
        })}
      </div>
      <h2>{t("form.labels.powerPrices")}</h2>
      <div>
        {Array.from({ length: 6 }).map((_, i) => {
          const current = i + 1;
          return (
            <FakeInput
              key={current}
              label={t("columns.energyPrice", { price: current })}
              value={prices[("powerPrice" + current) as keyof RatePrices]}
            />
          );
        })}
      </div>
    </>
  );
}
