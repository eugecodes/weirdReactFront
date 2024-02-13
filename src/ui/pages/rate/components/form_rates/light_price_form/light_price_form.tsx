import { InputFormik } from "@/src/ui/components/input/input";
import { useTranslation } from "react-i18next";

export default function LightPriceForm() {
  const { t } = useTranslation("rate");

  return (
    <>
      <h2>{t("form.labels.energyPrices")}</h2>
      <div>
        {Array.from({ length: 6 }).map((_, i) => {
          const current = i + 1;
          return (
            <InputFormik
              key={current}
              className="numeric-input-without-arrows"
              label={t("columns.energyPrice", { price: current })}
              id={"energyPrice" + current}
              name={"energyPrice" + current}
              type="number"
            />
          );
        })}
      </div>
      <h2>{t("form.labels.powerPrices")}</h2>
      <div>
        {Array.from({ length: 6 }).map((_, i) => {
          const current = i + 1;
          return (
            <InputFormik
              key={current}
              className="numeric-input-without-arrows"
              label={t("columns.energyPrice", { price: current })}
              id={"powerPrice" + current}
              name={"powerPrice" + current}
              type="number"
            />
          );
        })}
      </div>
    </>
  );
}
