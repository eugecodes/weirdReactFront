import { InputFormik } from "@/src/ui/components/input/input";
import { useTranslation } from "react-i18next";

export default function GasPriceForm() {
  const { t } = useTranslation("rate");
  return (
    <>
      <h2>{t("form.labels.energyPrices")}</h2>
      <div>
        <InputFormik label={t("columns.energyPrice", { price: 1 })} id="energyPrice1" name="energyPrice1" type="number" />
      </div>
      <h2>{t("form.labels.fixedTermPrice")}</h2>
      <div>
        <InputFormik label="P1" id="fixedTermPrice" name="fixedTermPrice" type="number" required />
      </div>
    </>
  );
}
