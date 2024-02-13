import type { Id, Option } from "@/src/common/utils/types";
import { PriceType } from "@/src/core/app/enums/price_type";
import { EnergyTypes } from "@/src/core/app/enums/energy_types";
import type { CreateCommissionModel } from "@/src/core/commission/domain/models/create_commission_model";
import useFormController from "@/src/ui/hooks/useFormController";
import { yupRequiredBoolean, yupRequiredField, yupRequiredPositiveNumber, yupRequiredPositiveNumberWithMaxDecimals } from "@/src/ui/utils/yup";
import { yup } from "@front_web_mrmilu/utils";
import type { FormikHelpers } from "formik";
import { useFormik } from "formik";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import type { ObjectShape } from "yup/lib/object";
import { debounce, isBoolean } from "lodash";
import { useEffectRunOnce } from "@front_web_mrmilu/hooks";
import { DEFAULT_DEBOUNCE_TIME, isEnumType, removeNullishValuesFromAnObject } from "@/src/common/utils";
import { useSearchParams } from "react-router-dom";
import { RangeTypes } from "@/src/core/app/enums/range_type";
import { useAutocompleteRateProvider } from "@/src/ui/provider/autocomplete_rate.provider";
import { useAutocompleteRateTypesProvider } from "@/src/ui/provider/autocomplete_rate_types.provider";
import type { FormCreateCommissionValues } from "@/src/ui/pages/commission/view_models/formCreateCommissionValues";
import i18n from "@/src/ui/i18n";

const formValues: FormCreateCommissionValues = {
  id: undefined,
  marketerId: undefined,
  name: "",
  energyType: undefined,
  priceType: undefined,
  rateType: undefined,
  rates: [],
  minPower: undefined,
  maxPower: undefined,
  minConsumption: undefined,
  maxConsumption: undefined,
  percentagetestCommission: undefined,
  rateTypeSegmentation: undefined,
  rangeType: RangeTypes.CONSUMPTION,
  testCommission: undefined
};

interface Props {
  onSubmitForm: (input: CreateCommissionModel) => Promise<void>;
  initialValues?: FormCreateCommissionValues;
  id?: Id;
}

const nameRequired = yupRequiredField();
const rateTypeSegmentationRequired = yupRequiredBoolean();
const minPowerRequired = yupRequiredPositiveNumberWithMaxDecimals(2);
const maxPowerRequired = yupRequiredPositiveNumberWithMaxDecimals(2);
const minConsumptionRequired = yupRequiredPositiveNumberWithMaxDecimals(2);
const maxConsumptionRequired = yupRequiredPositiveNumberWithMaxDecimals(2);
const percentagetestCommissionRequired = yupRequiredPositiveNumber();
const testCommissionRequired = yupRequiredPositiveNumber();
const required = i18n.t("errors.general.required", { ns: "common" });
const minMaxError = i18n.t("errors.general.maxLowerThanMind", { ns: "common" });

const getValidationsByTypeRange = (rangeType?: RangeTypes): ObjectShape => {
  const validations: ObjectShape = {};

  if (rangeType === RangeTypes.POWER) {
    validations.minPower = minPowerRequired;
    validations.maxPower = maxPowerRequired.test("commission.maxLowerThanMinPower", minMaxError, (value, context) => {
      return Boolean(value !== undefined && Number(value) >= Number(context.parent.minPower));
    });
  }

  if (rangeType === RangeTypes.CONSUMPTION) {
    validations.minConsumption = minConsumptionRequired;
    validations.maxConsumption = maxConsumptionRequired.test("commission.maxLowerThanMinConsume", minMaxError, (value, context) => {
      return Boolean(value !== undefined && Number(value) >= Number(context.parent.minConsumption));
    });
  }

  return validations;
};

const getValidationsByConditionals = (priceType?: PriceType, isSegmentedByRateType?: boolean, rangeType?: RangeTypes): ObjectShape => {
  let validations: ObjectShape = {};

  if (priceType === PriceType.FIXED_BASE) {
    validations.percentagetestCommission = percentagetestCommissionRequired;
  }

  if (priceType === PriceType.FIXED_FIXED) {
    validations.rateTypeSegmentation = rateTypeSegmentationRequired;
    validations.testCommission = testCommissionRequired;

    if (isSegmentedByRateType) {
      validations.rateType = yup.object().shape({
        id: yup.number().required(required),
        label: yup.string().required(required)
      });
    }

    validations = { ...validations, ...getValidationsByTypeRange(rangeType) };
  }

  return validations;
};

export default function useCreateEditCommissionForm({ onSubmitForm, initialValues = formValues, id }: Props) {
  const { t } = useTranslation(["common", "commission"]);
  const [metaPriceType, setMetaPriceType] = useState<PriceType>();
  const [metaRangeType, setMetaRangeType] = useState<RangeTypes>();
  const [isSegmentedByRateType, setIsSegmentedByRateType] = useState<boolean>();
  const [isRateTypeSet, setIsRateTypeSet] = useState(false);
  const [firstSubmit] = useState(false);
  const [searchParams] = useSearchParams();
  const marketerId = useMemo(() => Number(searchParams.get("marketerId")), [searchParams]);

  const {
    rates,
    getRateByName,
    rateFilterName,
    setRateEnergyType,
    setRateRateType,
    setRatePriceType,
    rateEnergtType,
    ratePriceType,
    rateRateType,
    setMarketerId
  } = useAutocompleteRateProvider((state) => ({
    rates: state.items,
    getRateByName: state.getByName,
    rateFilterName: state.filterName,
    rateEnergtType: state.energyType,
    rateRateType: state.rateType,
    ratePriceType: state.priceType,
    setRateEnergyType: state.setEnergyType,
    setRateRateType: state.setRateType,
    setRatePriceType: state.setPriceType,
    setMarketerId: state.setMarketerId
  }));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceRates = useCallback(debounce(getRateByName, DEFAULT_DEBOUNCE_TIME), []);
  useEffectRunOnce(() => {
    debounceRates();
  }, [debounceRates, rateFilterName, rateEnergtType, ratePriceType, rateRateType]);

  const { getRateTypesByName, rateTypesFilterName, setRateTypeEnergyType, energyType, rateTypes } = useAutocompleteRateTypesProvider((state) => ({
    rateTypes: state.items,
    getRateTypesByName: state.getByName,
    rateTypesFilterName: state.filterName,
    setRateTypeEnergyType: state.setEnergyType,
    energyType: state.energyType
  }));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceRateTypes = useCallback(debounce(getRateTypesByName, DEFAULT_DEBOUNCE_TIME), []);
  useEffectRunOnce(() => {
    debounceRateTypes();
  }, [debounceRateTypes, rateTypesFilterName, energyType]);

  const validationSchema = useMemo(() => {
    const requiredValues: ObjectShape = {
      name: nameRequired,
      priceType: yup
        .string()
        .required(required)
        .test("rate.isValidPriceType", t("commission:form.errors.priceType"), (value) => isEnumType(value, PriceType)),
      energyType: yup
        .string()
        .required(required)
        .test("rate.isValidCommissionType", t("commission:form.errors.energyType"), (value) => isEnumType(value, EnergyTypes)),
      rates: yup
        .array(
          yup.object({
            id: yup.number().required(required),
            label: yup.string().required(required)
          })
        )
        .test("commission.isValidRates", required, (value) => !!value && value.length > 0)
    };

    return yup.object({ ...requiredValues, ...getValidationsByConditionals(metaPriceType, isSegmentedByRateType, metaRangeType) });
  }, [t, metaPriceType, isSegmentedByRateType, metaRangeType]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: firstSubmit,
    validateOnChange: firstSubmit,
    enableReinitialize: true,
    onSubmit: async (values: FormCreateCommissionValues, { setSubmitting }: FormikHelpers<FormCreateCommissionValues>) => {
      if (!values.marketerId) {
        values.marketerId = marketerId;
      }
      setSubmitting(false);
      onSubmitForm(removeNullishValuesFromAnObject(values as CreateCommissionModel));
    }
  });

  const onChangePriceType = useCallback(
    (value: PriceType) => {
      formik.setFieldValue("priceType", value);
      setMetaPriceType(value);
      setRatePriceType(value);

      if (value === PriceType.FIXED_BASE) {
        formik.setFieldValue("percentagetestCommission", undefined);
        formik.setFieldValue("rateTypeSegmentation", undefined);
        formik.setFieldValue("rateType", undefined);
        formik.setFieldValue("minPower", undefined);
        formik.setFieldValue("maxPower", undefined);
        formik.setFieldValue("minConsumption", undefined);
        formik.setFieldValue("maxConsumption", undefined);
        formik.setFieldValue("rangeType", undefined);
      }

      if (value === PriceType.FIXED_FIXED) {
        formik.setFieldValue("percentagetestCommission", undefined);
        formik.setFieldValue("rateTypeSegmentation", false);
        formik.setFieldValue("rangeType", RangeTypes.CONSUMPTION);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setRatePriceType]
  );

  const onChangeEnergyType = useCallback(
    (value: EnergyTypes) => {
      formik.setFieldValue("energyType", value);
      setRateTypeEnergyType(value);
      setRateEnergyType(value);

      if (value === EnergyTypes.GAS) {
        setMetaRangeType(RangeTypes.CONSUMPTION);
        formik.setFieldValue("rangeType", RangeTypes.CONSUMPTION);
      }

      if (value === EnergyTypes.GAS && metaPriceType === PriceType.FIXED_FIXED) {
        formik.setFieldValue("rangeType", RangeTypes.CONSUMPTION);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setRateTypeEnergyType, setRateEnergyType]
  );

  const onChangeRangeType = useCallback((value: RangeTypes) => {
    setMetaRangeType(value);
    formik.setFieldValue("rangeType", value);

    if (value === RangeTypes.CONSUMPTION) {
      formik.setFieldValue("minPower", undefined);
      formik.setFieldValue("maxPower", undefined);
    }

    if (value === RangeTypes.POWER) {
      formik.setFieldValue("minConsumption", undefined);
      formik.setFieldValue("maxConsumption", undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeRateType = useCallback(
    (value: Option | undefined) => {
      formik.setFieldValue("rateType", value);
      setRateRateType(value ? [value] : undefined);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setRateRateType]
  );

  const onChangeRate = useCallback((value: Option[] | undefined) => {
    formik.setFieldValue("rates", value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffectRunOnce(() => {
    setMarketerId(marketerId);
  }, [marketerId, setMarketerId]);

  useEffect(() => {
    setIsSegmentedByRateType(formik.values.rateTypeSegmentation);
  }, [formik.values.rateTypeSegmentation]);

  useEffect(() => {
    if (initialValues.energyType && !energyType) {
      onChangeEnergyType(initialValues.energyType);
    }
    if (initialValues.rateType && !isRateTypeSet) {
      onChangeRateType(initialValues.rateType);
      setIsRateTypeSet(true);
    }

    if (initialValues.rangeType && !metaRangeType) {
      onChangeRangeType(initialValues.rangeType);
    }

    if (isBoolean(initialValues.rateTypeSegmentation) && !isBoolean(isSegmentedByRateType)) {
      setIsSegmentedByRateType(initialValues.rateTypeSegmentation);
    }

    if (initialValues.marketerId) {
      setMarketerId(initialValues.marketerId);
    }
  }, [
    initialValues.energyType,
    initialValues.rateType,
    energyType,
    onChangeEnergyType,
    onChangeRateType,
    isRateTypeSet,
    initialValues.rangeType,
    onChangeRangeType,
    initialValues.rateTypeSegmentation,
    isSegmentedByRateType,
    metaRangeType,
    initialValues.marketerId,
    setMarketerId
  ]);

  const { isFormEmpty } = useFormController({ formik, id, initialValues });

  return {
    formSchema: formik,
    isFormEmpty,
    onChangeEnergyType,
    energyType,
    onChangePriceType,
    onChangeRateType,
    onChangeRangeType,
    onChangeRate,
    rates,
    rateTypes
  };
}
