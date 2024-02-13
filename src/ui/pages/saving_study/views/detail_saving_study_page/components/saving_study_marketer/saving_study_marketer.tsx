import { useTranslation } from "react-i18next";
import { useMutationSavingStudyProvider } from "@/src/ui/pages/saving_study/provider/mutation_saving_study.provider";
import FakeInput, { FakeInputWithLabelCaseUnset } from "@/src/ui/components/fake_input/fake_input";
import type { DetailSavingStudyModel } from "@/src/core/saving_study/domain/models/detail_saving_study_model";
import { MAX_PRICES } from "@/src/common/utils";
import { EnergyTypes } from "@/src/core/app/enums/energy_types";
import Styled from "../../detail_saving_study_page.styled";

export default function SavingStudyMarketer() {
  const { t } = useTranslation("saving_study");
  const savingStudy = useMutationSavingStudyProvider((state) => state.item);

  return (
    <Styled.Form>
      <h2>{t("columns.currentMarketer")}</h2>
      <Styled.FormGrid>
        <FakeInput label={t("columns.name")} value={savingStudy?.marketer} />
      </Styled.FormGrid>

      <h2>{t("form.titles.supply")}</h2>
      <Styled.FormGrid>
        <FakeInput label={t("columns.anualConsumption")} value={savingStudy?.anualConsumption} />
        <FakeInput label={t("columns.analysedDays")} value={savingStudy?.analyzedDays} />
      </Styled.FormGrid>
      <Styled.FormGroupLabel>{t("form.titles.actualEnergy")}</Styled.FormGroupLabel>
      <Styled.FormGrid>
        {Array.from({ length: MAX_PRICES }).map((_, i) => {
          const current = i + 1;
          return (
            <FakeInputWithLabelCaseUnset
              key={current}
              label={t("columns.energyPriceUnit", { current })}
              value={savingStudy?.[`energyPrice${current}` as keyof DetailSavingStudyModel] as number}
            />
          );
        })}
      </Styled.FormGrid>
      <>
        {savingStudy?.rateType?.energyType === EnergyTypes.LIGHT && (
          <>
            <Styled.FormGroupLabel>{t("form.titles.actualPower")}</Styled.FormGroupLabel>
            <Styled.FormGrid>
              {Array.from({ length: MAX_PRICES }).map((_, i) => {
                const current = i + 1;
                return (
                  <FakeInputWithLabelCaseUnset
                    key={current}
                    label={t("columns.powerPricesCurrency", { current })}
                    value={savingStudy?.[`powerPrice${current}` as keyof DetailSavingStudyModel] as number}
                  />
                );
              })}
            </Styled.FormGrid>
          </>
        )}
      </>

      {savingStudy?.rateType?.energyType === EnergyTypes.GAS && (
        <>
          <h2>{t("form.titles.fixedPrice")}</h2>
          <Styled.FormGrid>
            <FakeInput label={t("columns.fixedPriceShort")} value={savingStudy?.fixedPrice} />
          </Styled.FormGrid>
        </>
      )}

      <h2>{t("columns.otherCost")}</h2>
      <Styled.FormGrid>
        <FakeInput label={t("columns.otherCostEurMonth")} value={savingStudy?.otherCostEurMonth} />
        <FakeInputWithLabelCaseUnset label={t("columns.otherCostEurKwh")} value={savingStudy?.otherCostEurKwh} />
        <FakeInput label={t("columns.otherCostPercentage")} value={savingStudy?.otherCostPercentage} />
      </Styled.FormGrid>
    </Styled.Form>
  );
}
