import { useTranslation } from "react-i18next";
import { useMutationSavingStudyProvider } from "@/src/ui/pages/saving_study/provider/mutation_saving_study.provider";
import FakeInput, { FakeInputWithLabelCaseUnset } from "@/src/ui/components/fake_input/fake_input";
import { getBooleanTranslation, getClientTypeTranslation, getEnergyTypeTranslation } from "@/src/ui/i18n/utils";
import type { DetailSavingStudyModel } from "@/src/core/saving_study/domain/models/detail_saving_study_model";
import { MAX_PRICES } from "@/src/common/utils";
import { EnergyTypes } from "@/src/core/app/enums/energy_types";
import Styled from "../../detail_saving_study_page.styled";

export default function SavingStudyParameter() {
  const { t } = useTranslation("saving_study");
  const savingStudy = useMutationSavingStudyProvider((state) => state.item);

  return (
    <Styled.Form>
      <h2>{t("form.titles.studyType")}</h2>
      <Styled.FormGrid>
        <FakeInput label={t("columns.existingClient")} value={getBooleanTranslation(savingStudy?.isExistingClient)} />
        <FakeInput label={t("columns.extractSipsConsume")} value={getBooleanTranslation(savingStudy?.isFromSIPS)} />
        <FakeInput label={t("columns.compareConditions")} value={getBooleanTranslation(savingStudy?.isCompareConditions)} />
      </Styled.FormGrid>
      <h2>{t("form.titles.data")}</h2>
      <Styled.FormGrid>
        <FakeInput label={t("columns.clientType")} value={getClientTypeTranslation(savingStudy?.clientType)} />
        <FakeInput label={t("columns.clientName")} value={savingStudy?.clientName} />
        <FakeInput label={t("columns.clientNif")} value={savingStudy?.clientNif} />
        <FakeInput label={t("columns.cups")} value={savingStudy?.cups} />
        <FakeInput label={t("columns.energyType")} value={getEnergyTypeTranslation(savingStudy?.rateType?.energyType)} />
        <FakeInput label={t("columns.rateType")} value={savingStudy?.rateType?.name} />
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
              label={t("columns.consumptionUpperCase", { current })}
              value={savingStudy?.[`consumption${current}` as keyof DetailSavingStudyModel] as number}
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
                    label={t("columns.powerUpperCase", { current })}
                    value={savingStudy?.[`power${current}` as keyof DetailSavingStudyModel] as number}
                  />
                );
              })}
            </Styled.FormGrid>
          </>
        )}
      </>
    </Styled.Form>
  );
}
