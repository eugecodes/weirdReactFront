import { useTranslation } from "react-i18next";
import { useMutationSavingStudyProvider } from "@/src/ui/pages/saving_study/provider/mutation_saving_study.provider";
import FakeInput, { FakeInputWithLabelCaseUnset } from "@/src/ui/components/fake_input/fake_input";
import { MAX_PRICES } from "@/src/common/utils";
import { EnergyTypes } from "@/src/core/app/enums/energy_types";
import Styled from "../../detail_saving_study_page.styled";
import { getBooleanTranslation, getPriceTypeTranslation } from "@/src/ui/i18n/utils";
import type { DetailSelectedRateModel } from "@/src/core/saving_study/domain/models/selected_rate/detail_selected_rate_model";

export default function SavingStudySelectedRate() {
  const { t } = useTranslation(["saving_study", "rate"]);
  const savingStudy = useMutationSavingStudyProvider((state) => state.item);
  const selectedRate = savingStudy?.selectedRate;

  return (
    <Styled.Form>
      <h2>{t("saving_study:form.titles.data")}</h2>
      <Styled.FormGrid>
        <FakeInput label={t("saving_study:columns.marketer")} value={selectedRate?.marketerName} />
        <FakeInput label={t("saving_study:columns.rateName")} value={selectedRate?.rateName} />
        <FakeInput label={t("rate:columns.priceType")} value={getPriceTypeTranslation(selectedRate?.priceType)} />
        <FakeInput label={t("rate:columns.length")} value={selectedRate?.duration} />
        <FakeInput label={t("rate:columns.permanency")} value={getBooleanTranslation(selectedRate?.permanency)} />
        <FakeInput label={t("rate:columns.isFullRenewable")} value={getBooleanTranslation(selectedRate?.isFulllRenewable)} />
        <FakeInput label={t("rate:columns.compensationSurplus")} value={getBooleanTranslation(selectedRate?.compensationSurplus)} />
        <FakeInput label={t("rate:columns.compensationSurplusValue")} value={selectedRate?.compensationSurplusValue} />
      </Styled.FormGrid>

      <h2>{t("saving_study:form.titles.energyPrices")}</h2>
      <Styled.FormGrid>
        {Array.from({ length: MAX_PRICES }).map((_, i) => {
          const current = i + 1;
          return (
            <FakeInputWithLabelCaseUnset
              key={current}
              label={t("saving_study:columns.energyPriceUnit", { current })}
              value={selectedRate?.[`energyPrice${current}` as keyof DetailSelectedRateModel] as number}
            />
          );
        })}
      </Styled.FormGrid>
      <>
        {savingStudy?.rateType?.energyType === EnergyTypes.LIGHT && (
          <>
            <h2>{t("saving_study:form.titles.actualPowerPrices")}</h2>
            <Styled.FormGrid>
              {Array.from({ length: MAX_PRICES }).map((_, i) => {
                const current = i + 1;
                return (
                  <FakeInputWithLabelCaseUnset
                    key={current}
                    label={t("saving_study:columns.powerPricesCurrency", { current })}
                    value={selectedRate?.[`powerPrice${current}` as keyof DetailSelectedRateModel] as number}
                  />
                );
              })}
            </Styled.FormGrid>
          </>
        )}

        {savingStudy?.rateType?.energyType === EnergyTypes.GAS && (
          <>
            <h2>{t("saving_study:form.titles.fixedPrice")}</h2>
            <Styled.FormGrid>
              <FakeInput label={t("saving_study:columns.fixedPriceShort")} value={selectedRate?.fixedPrice} />
            </Styled.FormGrid>
          </>
        )}
      </>

      <h2>{t("saving_study:form.titles.otherCost")}</h2>
      <Styled.FormGrid>
        <FakeInput label={t("saving_study:columns.otherCostEurMonth")} value={selectedRate?.otherCostEurMonth} />
        <FakeInputWithLabelCaseUnset label={t("saving_study:columns.otherCostEurKwh")} value={selectedRate?.otherCostEurKwh} />
        <FakeInput label={t("saving_study:columns.otherCostPercentage")} value={selectedRate?.otherCostPercentage} />
      </Styled.FormGrid>

      <h2>{t("saving_study:form.titles.savingDetail")}</h2>
      <Styled.FormGroupLabel>{t("saving_study:form.titles.saving")}</Styled.FormGroupLabel>
      <Styled.FormGrid>
        <FakeInput label={t("saving_study:columns.relativeSaving")} value={selectedRate?.savingRelative} />
        <FakeInput label={t("saving_study:columns.absoluteSaving")} value={selectedRate?.savingAbsolute} />
      </Styled.FormGrid>
      <Styled.FormGroupLabel>{t("saving_study:form.titles.finalCost")}</Styled.FormGroupLabel>
      <Styled.FormGrid>
        <FakeInput label={t("saving_study:columns.energyCost")} value={selectedRate?.energyCost} />
        <FakeInput label={t("saving_study:columns.powerCost")} value={selectedRate?.powerCost} />
        <FakeInput label={t("saving_study:columns.fixedTermCost")} value={selectedRate?.fixedCost} />
        <FakeInput label={t("saving_study:columns.otherCostUnit")} value={selectedRate?.otherCosts} />
        <FakeInput label={t("saving_study:columns.electricityTax")} value={selectedRate?.ieCost} />
        <FakeInput label={t("saving_study:columns.ihCost")} value={selectedRate?.ihCost} />
        <FakeInput label={t("saving_study:columns.vat")} value={selectedRate?.ivaCost} />
      </Styled.FormGrid>
      <Styled.FormGroupLabel>{t("saving_study:form.titles.commissions")}</Styled.FormGroupLabel>
      <Styled.FormGrid>
        <FakeInput label={t("saving_study:selectedRate.columns.totalCommission")} value={selectedRate?.totalCommission} />
        <FakeInput label={t("saving_study:columns.theoreticalCommission")} value={selectedRate?.theoreticalCommission} />
        <FakeInput label={t("saving_study:columns.otherCostCommission")} value={selectedRate?.otherCostsCommission} />
      </Styled.FormGrid>
    </Styled.Form>
  );
}
