import type { CreateSavingStudyModel } from "@/src/core/saving_study/domain/models/create_saving_study_model";
import { yup } from "@front_web_mrmilu/utils";
import type { FormikHelpers } from "formik";
import { useFormik } from "formik";
import { useCallback, useMemo, useState } from "react";
import useFormController from "@/src/ui/hooks/useFormController";
import type { Id, Option } from "@/src/common/utils/types";
import { ClientType } from "@/src/core/app/enums/client_type";
import { useTranslation } from "react-i18next";
import { DEFAULT_DEBOUNCE_TIME, isEnumType, removeNullishValuesFromAnObject } from "@/src/common/utils";
import { EnergyTypes } from "@/src/core/app/enums/energy_types";
import type { ObjectShape } from "yup/lib/object";
import {
  yupCupsField,
  yupPositiveNumber,
  yupPositiveNumberWithMaxDecimals,
  yupRequiredPositiveNumber,
  yupRequiredPositiveNumberWithMaxDecimals,
  yupString
} from "@/src/ui/utils/yup";
import { useAutocompleteRateTypesProvider } from "@/src/ui/provider/autocomplete_rate_types.provider";
import { useEffectRunOnce } from "@front_web_mrmilu/hooks";
import { debounce } from "lodash";
import i18n from "@/src/ui/i18n";

export interface FormCreateSavingStudyValues {
  id?: Id;
  cups: string;
  isExistingClient: boolean;
  isFromSIPS: boolean;
  isCompareConditions: boolean;
  clientType?: ClientType;
  clientName?: string;
  clientNif?: string;
  rateType?: Option;
  rate?: Option;
  energyType?: EnergyTypes;
  analyzedDays?: number;
  consumption1?: number;
  consumption2?: number;
  consumption3?: number;
  consumption4?: number;
  consumption5?: number;
  consumption6?: number;
  anualConsumption?: number;
  power1?: number;
  power2?: number;
  power3?: number;
  power4?: number;
  power5?: number;
  power6?: number;
  marketer?: string;
  powerPrice1?: number;
  powerPrice2?: number;
  powerPrice3?: number;
  powerPrice4?: number;
  powerPrice5?: number;
  powerPrice6?: number;
  energyPrice1?: number;
  energyPrice2?: number;
  energyPrice3?: number;
  energyPrice4?: number;
  energyPrice5?: number;
  energyPrice6?: number;
  fixedPrice?: number;
  otherCostEurMonth?: number;
  otherCostEurKwh?: number;
  otherCostPercentage?: number;
}

const formValues: FormCreateSavingStudyValues = {
  id: undefined,
  cups: "",
  isExistingClient: false,
  isFromSIPS: false,
  isCompareConditions: false,
  clientType: undefined,
  clientName: "",
  clientNif: "",
  rateType: undefined,
  energyType: undefined,
  analyzedDays: undefined,
  anualConsumption: undefined,
  consumption1: undefined,
  consumption2: undefined,
  consumption3: undefined,
  consumption4: undefined,
  consumption5: undefined,
  consumption6: undefined,
  power1: undefined,
  power2: undefined,
  power3: undefined,
  power4: undefined,
  power5: undefined,
  power6: undefined,
  marketer: "",
  powerPrice1: undefined,
  powerPrice2: undefined,
  powerPrice3: undefined,
  powerPrice4: undefined,
  powerPrice5: undefined,
  powerPrice6: undefined,
  energyPrice1: undefined,
  energyPrice2: undefined,
  energyPrice3: undefined,
  energyPrice4: undefined,
  energyPrice5: undefined,
  energyPrice6: undefined,
  fixedPrice: undefined,
  otherCostEurMonth: undefined,
  otherCostEurKwh: undefined,
  otherCostPercentage: undefined
};

const cupsRequired = yupCupsField();
const clientName = yupString();
const clientNif = yupString();
const analyzedDays = yupPositiveNumber();
const analyzedDaysRequired = yupRequiredPositiveNumber();
const anualConsumption = yupPositiveNumber();
const anualConsumptionRequired = yupRequiredPositiveNumber();
const power1 = yupPositiveNumberWithMaxDecimals(2);
const power2 = yupPositiveNumberWithMaxDecimals(2);
const power1Required = yupRequiredPositiveNumberWithMaxDecimals(2);
const power2Required = yupRequiredPositiveNumberWithMaxDecimals(2);
const power3 = yupPositiveNumberWithMaxDecimals(2);
const power4 = yupPositiveNumberWithMaxDecimals(2);
const power5 = yupPositiveNumberWithMaxDecimals(2);
const power6 = yupPositiveNumberWithMaxDecimals(2);
const consumption1 = yupPositiveNumber();
const consumption2 = yupPositiveNumber();
const consumption3 = yupPositiveNumber();
const consumption4 = yupPositiveNumber();
const consumption5 = yupPositiveNumber();
const consumption6 = yupPositiveNumber();
const marketer = yupString();
const energyPrice1 = yupPositiveNumberWithMaxDecimals(6);
const energyPrice1Required = yupRequiredPositiveNumberWithMaxDecimals(6);
const energyPrice2 = yupPositiveNumberWithMaxDecimals(6);
const energyPrice3 = yupPositiveNumberWithMaxDecimals(6);
const energyPrice4 = yupPositiveNumberWithMaxDecimals(6);
const energyPrice5 = yupPositiveNumberWithMaxDecimals(6);
const energyPrice6 = yupPositiveNumberWithMaxDecimals(6);
const powerPrice1 = yupPositiveNumberWithMaxDecimals(6);
const powerPrice2 = yupPositiveNumberWithMaxDecimals(6);
const powerPrice1Required = yupRequiredPositiveNumberWithMaxDecimals(6);
const powerPrice2Required = yupRequiredPositiveNumberWithMaxDecimals(6);
const powerPrice3 = yupPositiveNumberWithMaxDecimals(6);
const powerPrice4 = yupPositiveNumberWithMaxDecimals(6);
const powerPrice5 = yupPositiveNumberWithMaxDecimals(6);
const powerPrice6 = yupPositiveNumberWithMaxDecimals(6);
const fixedPrice = yupPositiveNumberWithMaxDecimals(6);
const fixedPriceRequired = yupRequiredPositiveNumberWithMaxDecimals(6);
const otherCostEurMonth = yupPositiveNumberWithMaxDecimals(2);
const otherCostEurKwh = yupPositiveNumberWithMaxDecimals(2);
const otherCostPercentage = yupPositiveNumberWithMaxDecimals(2);

const getSelectRateLightValidationSchema = () => ({
  power1: power1Required,
  power2: power2Required,
  power3,
  power4,
  power5,
  power6
});

const getSelectRateCompareConditionsValidationSchema = (energyType: EnergyTypes) => {
  const requiredValues: ObjectShape = {
    marketer,
    energyPrice1: energyPrice1Required,
    energyPrice2,
    energyPrice3,
    energyPrice4,
    energyPrice5,
    energyPrice6
  };

  if (energyType === EnergyTypes.LIGHT) {
    requiredValues.powerPrice1 = powerPrice1Required;
    requiredValues.powerPrice2 = powerPrice2Required;
    requiredValues.powerPrice3 = powerPrice3;
    requiredValues.powerPrice4 = powerPrice4;
    requiredValues.powerPrice5 = powerPrice5;
    requiredValues.powerPrice6 = powerPrice6;
  }

  if (energyType === EnergyTypes.GAS) {
    requiredValues.fixedPrice = fixedPriceRequired;
  }

  return requiredValues;
};

export function validationSchemaForSelectRateButton({
  energyType,
  isFromSips,
  isCompareConditions
}: {
  energyType: EnergyTypes;
  isFromSips: boolean;
  isCompareConditions: boolean;
}) {
  const required = i18n.t("errors.general.required", { ns: "common" });
  let requiredValues: ObjectShape = {
    cups: cupsRequired,
    clientType: yup
      .string()
      .test("rate.isValidClientType", i18n.t("form.errors.clientType", { ns: "saving_study" }), (value) => !value || isEnumType(value, ClientType)),
    rateType: yup.object({
      id: yup.number().required(required),
      label: yup.string().required(required)
    }),
    analyzedDays: analyzedDaysRequired,
    consumption1,
    consumption2,
    consumption3,
    consumption4,
    consumption5,
    consumption6,
    otherCostEurMonth,
    otherCostEurKwh,
    otherCostPercentage
  };

  if (!isFromSips) {
    requiredValues.anualConsumption = anualConsumptionRequired;
  }

  if (isCompareConditions) {
    requiredValues = {
      ...requiredValues,
      ...getSelectRateCompareConditionsValidationSchema(energyType)
    };
  }

  if (energyType === EnergyTypes.LIGHT) {
    return {
      ...requiredValues,
      ...getSelectRateLightValidationSchema()
    };
  }

  return requiredValues;
}

interface Props {
  onSubmitForm: (input: CreateSavingStudyModel) => Promise<void>;
  initialValues?: FormCreateSavingStudyValues;
  id?: Id;
  enableReinitialize?: boolean;
}

export default function useCreateEditSavingStudy({ onSubmitForm, initialValues = formValues, id, enableReinitialize = false }: Props) {
  const { t } = useTranslation(["common", "saving_study"]);
  const [isRateTypeSet, setIsRateTypeSet] = useState(false);
  const [isEnergyTypeSet, setIsEnergyTypeSet] = useState(false);
  const [firstSubmit] = useState(false);

  const { getRateTypesByName, rateTypesFilterName, setEnergyType, energyType, setRateTypesFilterName } = useAutocompleteRateTypesProvider(
    (state) => ({
      getRateTypesByName: state.getByName,
      rateTypesFilterName: state.filterName,
      setRateTypesFilterName: state.setFilterName,
      setEnergyType: state.setEnergyType,
      energyType: state.energyType
    })
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSetRateTypeName = useCallback(debounce(getRateTypesByName, DEFAULT_DEBOUNCE_TIME), []);
  useEffectRunOnce(() => {
    debounceSetRateTypeName();
  }, [debounceSetRateTypeName, rateTypesFilterName, energyType]);

  const validationSchema = useMemo(() => {
    const required = t("common:errors.general.required");
    const requiredValues: ObjectShape = {
      energyType: yup
        .string()
        .required(required)
        .test("rate.isValidRateType", t("saving_study:form.errors.energyType"), (value) => isEnumType(value, EnergyTypes)),
      clientType: yup
        .string()
        .nullable()
        .test("rate.isValidClientType", t("saving_study:form.errors.clientType"), (value) => !value || isEnumType(value, ClientType)),
      rateType: yup.object({
        id: yup.number(),
        label: yup.string()
      }),
      cups: cupsRequired,
      clientName,
      clientNif,
      analyzedDays,
      anualConsumption,
      consumption1,
      consumption2,
      consumption3,
      consumption4,
      consumption5,
      consumption6,
      marketer,
      energyPrice1,
      energyPrice2,
      energyPrice3,
      energyPrice4,
      energyPrice5,
      energyPrice6,
      otherCostEurMonth,
      otherCostEurKwh,
      otherCostPercentage,
      fixedPrice,
      power1,
      power2,
      power3,
      power4,
      power5,
      power6,
      powerPrice1,
      powerPrice2,
      powerPrice3,
      powerPrice4,
      powerPrice5,
      powerPrice6
    };

    return yup.object().shape(requiredValues);
  }, [t]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: firstSubmit,
    validateOnChange: firstSubmit,
    enableReinitialize,
    onSubmit: async (values: FormCreateSavingStudyValues, { setSubmitting }: FormikHelpers<FormCreateSavingStudyValues>) => {
      setSubmitting(false);
      onSubmitForm(removeNullishValuesFromAnObject(values) as CreateSavingStudyModel);
    }
  });

  const { isFormEmpty } = useFormController({ formik, id, initialValues });

  const onChangeEnergyType = useCallback(
    (value: EnergyTypes) => {
      formik.setFieldValue("energyType", value);
      formik.setFieldValue("rateType", undefined);
      setEnergyType(value);

      setRateTypesFilterName("");

      if (value === EnergyTypes.GAS) {
        const PRICE_START = 1;
        const PRICE_END = 6;
        for (let priceIndex = PRICE_START; priceIndex < PRICE_END; priceIndex++) {
          formik.setFieldValue("power" + priceIndex, undefined);
          formik.setFieldValue("powerPrice" + priceIndex, undefined);
        }
      }

      if (value === EnergyTypes.LIGHT) {
        formik.setFieldValue("fixedPrice", undefined);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setEnergyType]
  );

  useEffectRunOnce(() => {
    if (initialValues.energyType && !isEnergyTypeSet && !isRateTypeSet) {
      onChangeEnergyType(initialValues.energyType);
      setIsEnergyTypeSet(true);
    }

    if (initialValues.rateType && !isRateTypeSet && !isEnergyTypeSet) {
      setIsRateTypeSet(true);
      formik.setFieldValue("rateType", initialValues.rateType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues.rateType, isRateTypeSet, isEnergyTypeSet, onChangeEnergyType]);

  return { formSchema: formik, isFormEmpty, validationSchemaForSelectRateButton, onChangeEnergyType };
}
