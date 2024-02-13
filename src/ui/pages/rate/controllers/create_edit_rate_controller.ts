import type { Id, Option } from "@/src/common/utils/types";
import { ClientType } from "@/src/core/app/enums/client_type";
import { PriceType } from "@/src/core/app/enums/price_type";
import { EnergyTypes } from "@/src/core/app/enums/energy_types";
import type { CreateRateModel } from "@/src/core/rate/domain/models/create_rate_model";
import useFormController from "@/src/ui/hooks/useFormController";
import { yupRequiredBoolean, yupRequiredField, yupRequiredPositiveNumber, yupRequiredPositiveNumberWithMaxDecimals } from "@/src/ui/utils/yup";
import { yup } from "@front_web_mrmilu/utils";
import type { FormikHelpers } from "formik";
import { useFormik } from "formik";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import type { ObjectShape } from "yup/lib/object";
import { useAutocompleteRateTypesProvider } from "@/src/ui/provider/autocomplete_rate_types.provider";
import { debounce } from "lodash";
import { useEffectRunOnce } from "@front_web_mrmilu/hooks";
import { DEFAULT_DEBOUNCE_TIME, isEnumType, removeNullishValuesFromAnObject } from "@/src/common/utils";
import { yupPositiveNumberWithMaxDecimals } from "@/src/ui/utils/yup";
import { useSearchParams } from "react-router-dom";
import { useAutocompleteMarketersProvider } from "../provider/autocomplete_marketer.provider";
import i18n from "@/src/ui/i18n";

interface FormCreateRateValues {
  id?: Id;
  marketer?: Option;
  name: string;
  energyType?: EnergyTypes;
  priceType?: PriceType;
  clientTypes?: ClientType[];
  rateType?: Option;
  permanency: boolean;
  length: string;
  isFullRenewable?: boolean;
  compensationSurplus?: boolean;
  compensationSurplusValue?: number;
  minPower?: number;
  maxPower?: number;
  minConsumption?: number;
  maxConsumption?: number;
  energyPrice1?: number;
  energyPrice2?: number;
  energyPrice3?: number;
  energyPrice4?: number;
  energyPrice5?: number;
  energyPrice6?: number;
  powerPrice1?: number;
  powerPrice2?: number;
  powerPrice3?: number;
  powerPrice4?: number;
  powerPrice5?: number;
  powerPrice6?: number;
  fixedTermPrice?: number;
}

const formValues: FormCreateRateValues = {
  id: undefined,
  marketer: undefined,
  name: "",
  energyType: undefined,
  priceType: undefined,
  clientTypes: [],
  rateType: undefined,
  permanency: false,
  length: "",
  isFullRenewable: undefined,
  compensationSurplus: undefined,
  compensationSurplusValue: undefined,
  minPower: undefined,
  maxPower: undefined,
  minConsumption: undefined,
  maxConsumption: undefined,
  energyPrice1: undefined,
  energyPrice2: undefined,
  energyPrice3: undefined,
  energyPrice4: undefined,
  energyPrice5: undefined,
  energyPrice6: undefined,
  powerPrice1: undefined,
  powerPrice2: undefined,
  powerPrice3: undefined,
  powerPrice4: undefined,
  powerPrice5: undefined,
  powerPrice6: undefined,
  fixedTermPrice: undefined
};

interface Props {
  onSubmitForm: (input: CreateRateModel) => Promise<void>;
  initialValues?: FormCreateRateValues;
  id?: Id;
  marketerId?: Id;
}

const nameRequired = yupRequiredField();
const permanencyRequired = yupRequiredBoolean();
const length = yupRequiredPositiveNumber();
const isFullRenewableRequired = yupRequiredBoolean();
const compensationSurplusRequired = yupRequiredBoolean();
const compensationSurplusValue = yupRequiredPositiveNumberWithMaxDecimals(6);
const minPower = yupPositiveNumberWithMaxDecimals(2);
const maxPower = yupPositiveNumberWithMaxDecimals(2);
const minConsumption = yupPositiveNumberWithMaxDecimals(2);
const maxConsumption = yupPositiveNumberWithMaxDecimals(2);
const energyPrice1 = yupPositiveNumberWithMaxDecimals(6);
const energyPrice2 = yupPositiveNumberWithMaxDecimals(6);
const energyPrice3 = yupPositiveNumberWithMaxDecimals(6);
const energyPrice4 = yupPositiveNumberWithMaxDecimals(6);
const energyPrice5 = yupPositiveNumberWithMaxDecimals(6);
const energyPrice6 = yupPositiveNumberWithMaxDecimals(6);
const powerPrice1 = yupPositiveNumberWithMaxDecimals(6);
const powerPrice2 = yupPositiveNumberWithMaxDecimals(6);
const powerPrice3 = yupPositiveNumberWithMaxDecimals(6);
const powerPrice4 = yupPositiveNumberWithMaxDecimals(6);
const powerPrice5 = yupPositiveNumberWithMaxDecimals(6);
const powerPrice6 = yupPositiveNumberWithMaxDecimals(6);
const fixedTermPriceRequired = yupRequiredPositiveNumberWithMaxDecimals(6);

const getLightValidations = (priceType?: PriceType, compensationSurplus?: boolean) => {
  const lightValidations: ObjectShape = {
    isFullRenewable: isFullRenewableRequired,
    compensationSurplus: compensationSurplusRequired,
    energyPrice1: energyPrice1,
    energyPrice2: energyPrice2,
    energyPrice3: energyPrice3,
    energyPrice4: energyPrice4,
    energyPrice5: energyPrice5,
    energyPrice6: energyPrice6,
    powerPrice1: powerPrice1,
    powerPrice2: powerPrice2,
    powerPrice3: powerPrice3,
    powerPrice4: powerPrice4,
    powerPrice5: powerPrice5,
    powerPrice6: powerPrice6
  };

  if (compensationSurplus) {
    lightValidations.compensationSurplusValue = compensationSurplusValue;
  }

  if (priceType === PriceType.FIXED_FIXED) {
    lightValidations.minPower = minPower;
    lightValidations.maxPower = maxPower.test(
      "rate.maxLowerThanMinPower",
      i18n.t("errors.general.maxLowerThanMin", { ns: "common" }),
      (value, context) => Boolean(!value || Number(value) >= Number(context.parent.minPower))
    );
  }

  return lightValidations;
};

const getGasValidations = () => ({
  minConsumption: minConsumption,
  maxConsumption: maxConsumption.test(
    "rate.maxLowerThanMinConsumption",
    i18n.t("errors.general.maxLowerThanMin", { ns: "common" }),
    (value, context) =>
      Boolean((value !== undefined && Number(value) >= Number(context.parent.minConsumption)) || context.parent.minConsumption === undefined)
  ),
  fixedTermPrice: fixedTermPriceRequired
});

const getValidationsByEnergyType = (energyType?: EnergyTypes, priceType?: PriceType, compensationSurplus?: boolean): ObjectShape => {
  let requiredValues: ObjectShape = {};

  if (energyType === EnergyTypes.LIGHT) {
    requiredValues = getLightValidations(priceType, compensationSurplus);
  }

  if (energyType === EnergyTypes.GAS) {
    requiredValues = getGasValidations();
  }

  return requiredValues;
};

export default function useCreateEditRateForm({ onSubmitForm, initialValues = formValues, id, marketerId }: Props) {
  const { t } = useTranslation(["common", "rate"]);
  const [metaPriceType, setMetaPriceType] = useState<PriceType>();
  const [isRateTypeSet, setIsRateTypeSet] = useState(false);
  const [isEnergyTypeSet, setIsEnergyTypeSet] = useState(false);
  const [isCompensationSurplusSet, setCompensationSurplusSet] = useState(false);
  const [firstSubmit] = useState(false);
  const [searchParams] = useSearchParams();

  const { getRateTypesByName, rateTypesFilterName, setEnergyType, energyType } = useAutocompleteRateTypesProvider((state) => ({
    getRateTypesByName: state.getByName,
    rateTypesFilterName: state.filterName,
    setEnergyType: state.setEnergyType,
    energyType: state.energyType
  }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSetRateTypeName = useCallback(debounce(getRateTypesByName, DEFAULT_DEBOUNCE_TIME), []);
  useEffectRunOnce(() => {
    debounceSetRateTypeName();
  }, [debounceSetRateTypeName, rateTypesFilterName, energyType]);

  const { getMarketersByName, marketersByName } = useAutocompleteMarketersProvider((state) => ({
    getMarketersByName: state.getByName,
    marketersByName: state.filterName
  }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSetMarketerName = useCallback(debounce(getMarketersByName, DEFAULT_DEBOUNCE_TIME), []);
  useEffectRunOnce(() => {
    debounceSetMarketerName();
  }, [debounceSetMarketerName, marketersByName]);

  const validationSchema = useMemo(() => {
    const required = t("common:errors.general.required");
    const requiredValues: ObjectShape = {
      name: nameRequired,
      priceType: yup
        .string()
        .required(required)
        .test("rate.isValidPriceType", t("rate:form.errors.priceType"), (value) => isEnumType(value, PriceType)),
      energyType: yup
        .string()
        .required(required)
        .test("rate.isValidRateType", t("rate:form.errors.energyType"), (value) => isEnumType(value, EnergyTypes)),
      clientTypes: yup
        .array()
        .of(
          yup
            .string()
            .required(required)
            .test("rate.isValidClientType", t("rate:form.errors.clientType"), (value) => isEnumType(value, ClientType))
        )
        .test("rates.isValidClient", required, (value) => !!value && value.length > 0),
      rateType: yup.object({
        id: yup.number().required(required),
        label: yup.string().required(required)
      }),
      permanency: permanencyRequired,
      compensationSurplus: compensationSurplusRequired,
      length
    };

    if (!marketerId) {
      requiredValues.marketer = yup.object({
        id: yup.number().required(required),
        label: yup.string().required(required)
      });
    }

    return yup.object({ ...requiredValues, ...getValidationsByEnergyType(energyType, metaPriceType, isCompensationSurplusSet) });
  }, [t, energyType, metaPriceType, marketerId, isCompensationSurplusSet]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: firstSubmit,
    validateOnChange: firstSubmit,
    enableReinitialize: true,
    onSubmit: async (values: FormCreateRateValues, { setSubmitting }: FormikHelpers<FormCreateRateValues>) => {
      if (!values.marketer && marketerId) {
        values.marketer = { id: marketerId, label: "" };
      }
      setSubmitting(false);
      onSubmitForm(removeNullishValuesFromAnObject(values) as CreateRateModel);
    }
  });

  useEffectRunOnce(() => {
    setEnergyType(formik.values.energyType);
  }, [formik.values.energyType]);

  const onChangeEnergyType = useCallback(
    (value: EnergyTypes) => {
      formik.setFieldValue("energyType", value);
      setEnergyType(value);

      if (value === EnergyTypes.GAS) {
        formik.setFieldValue("minPower", undefined);
        formik.setFieldValue("maxPower", undefined);
        formik.setFieldValue("powerPrice1", undefined);
        formik.setFieldValue("isFullRenewable", undefined);
        formik.setFieldValue("compensationSurplus", undefined);
        formik.setFieldValue("compensationSurplusValue", undefined);
        /* Starts at 1 but gas uses power price1 as well so, that's why we start by 2 */
        const PRICE_START = 2;
        const PRICE_END = 6;
        for (let priceIndex = PRICE_START; priceIndex < PRICE_END; priceIndex++) {
          formik.setFieldValue("energyPrice" + priceIndex, undefined);
          formik.setFieldValue("powerPrice" + priceIndex, undefined);
        }
      }

      if (value === EnergyTypes.LIGHT) {
        formik.setFieldValue("fixedTermPrice", undefined);
        formik.setFieldValue("minConsumption", undefined);
        formik.setFieldValue("maxConsumption", undefined);
        formik.setFieldValue("isFullRenewable", false);
        formik.setFieldValue("compensationSurplus", false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setEnergyType]
  );

  const onChangePriceType = useCallback((value: PriceType) => {
    formik.setFieldValue("priceType", value);
    setMetaPriceType(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeRateType = useCallback((value: Option | undefined) => {
    formik.setFieldValue("rateType", value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangecompensationSurplus = useCallback((value: boolean) => {
    formik.setFieldValue("compensationSurplus", value);
    setCompensationSurplusSet(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    formValues.compensationSurplus = isCompensationSurplusSet;
    const energyTypeFromParams = searchParams.get("energyType");
    if (energyTypeFromParams && energyType !== energyTypeFromParams && !isEnergyTypeSet) {
      setIsEnergyTypeSet(true);
      formValues.energyType = energyTypeFromParams as EnergyTypes;
      if (formValues.energyType === EnergyTypes.LIGHT) {
        formValues.isFullRenewable = false;
      }
    }
  }, [energyType, onChangeEnergyType, searchParams, isEnergyTypeSet, isCompensationSurplusSet]);

  useEffect(() => {
    if (initialValues.energyType && !energyType && !isEnergyTypeSet) {
      onChangeEnergyType(initialValues.energyType);
      setIsEnergyTypeSet(true);
    }
    if (initialValues.rateType && !isRateTypeSet) {
      onChangeRateType(initialValues.rateType);
      setIsRateTypeSet(true);
    }
  }, [
    initialValues.energyType,
    initialValues.rateType,
    energyType,
    onChangeEnergyType,
    onChangeRateType,
    isRateTypeSet,
    isEnergyTypeSet,
    onChangecompensationSurplus
  ]);

  const { isFormEmpty } = useFormController({ formik, id, initialValues });

  return { formSchema: formik, isFormEmpty, onChangeEnergyType, energyType, onChangePriceType, onChangeRateType, onChangecompensationSurplus };
}
