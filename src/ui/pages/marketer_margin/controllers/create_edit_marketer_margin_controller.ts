import type { Id, Option } from "@/src/common/utils/types";
import useFormController from "@/src/ui/hooks/useFormController";
import { yupRequiredPositiveNumberWithMaxDecimals } from "@/src/ui/utils/yup";
import { yup } from "@front_web_mrmilu/utils";
import type { FormikHelpers } from "formik";
import { useFormik } from "formik";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import type { ObjectShape } from "yup/lib/object";
import { useAutocompleteRateTypesProvider } from "@/src/ui/provider/autocomplete_rate_types.provider";
import { debounce } from "lodash";
import { useEffectRunOnce } from "@front_web_mrmilu/hooks";
import { DEFAULT_DEBOUNCE_TIME, isEnumType, removeNullishValuesFromAnObject } from "@/src/common/utils";
import type { CreateMarketerMarginModel } from "@/src/core/marketer_margin/domain/models/create_marketer_margin_model";
import { MarginType } from "@/src/core/app/enums/margin_type";
import { useAutocompleteRateProvider } from "@/src/ui/provider/autocomplete_rate.provider";
import { useSearchParams } from "react-router-dom";
import type { BasicRateTypeModel } from "@/src/core/rate_type/domain/models/basic_rate_type_model";

interface MarketerMarginRate extends Option {
  rateType?: BasicRateTypeModel;
}

interface FormCreateMarketerMarginValues {
  id?: Id;
  marketerId?: Id;
  rate?: MarketerMarginRate;
  type?: MarginType;
  rateType?: Option;
  minConsume?: number;
  maxConsume?: number;
  minMargin?: number;
  maxMargin?: number;
}

const formValues: FormCreateMarketerMarginValues = {
  id: undefined,
  marketerId: undefined,
  rate: undefined,
  type: undefined,
  rateType: undefined,
  minConsume: undefined,
  maxConsume: undefined,
  minMargin: 0,
  maxMargin: 100
};

interface Props {
  onSubmitForm: (input: CreateMarketerMarginModel) => Promise<void>;
  initialValues?: FormCreateMarketerMarginValues;
  id?: Id;
}

const minMarginRequired = yupRequiredPositiveNumberWithMaxDecimals(1);
const maxMarginRequired = yupRequiredPositiveNumberWithMaxDecimals(1);
const minConsumeRequired = yupRequiredPositiveNumberWithMaxDecimals(2);
const maxConsumeRequired = yupRequiredPositiveNumberWithMaxDecimals(2);

export default function useCreateEditRateForm({ onSubmitForm, initialValues = formValues, id }: Props) {
  const { t } = useTranslation(["common", "marketer_margin"]);
  const [isRateSet, setIsRateSet] = useState(false);
  const [marginType, setMarginType] = useState<MarginType>();
  const [searchParams] = useSearchParams();
  const marketerId = useMemo(() => Number(searchParams.get("marketerId")), [searchParams]);
  const [firstSubmit] = useState(false);

  const { getRateByName, rateFilterName, setMarketerId, setRateFilterName, setRateType, rateType } = useAutocompleteRateProvider((state) => ({
    getRateByName: state.getByName,
    rateFilterName: state.filterName,
    setRateFilterName: state.setFilterName,
    setMarketerId: state.setMarketerId,
    setRateType: state.setRateType,
    rateType: state.rateType
  }));

  const { getRateTypesByName, rateTypesFilterName } = useAutocompleteRateTypesProvider((state) => ({
    getRateTypesByName: state.getByName,
    rateTypesFilterName: state.filterName
  }));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSetRateName = useCallback(debounce(getRateByName, DEFAULT_DEBOUNCE_TIME), []);
  useEffectRunOnce(() => {
    debounceSetRateName();
  }, [debounceSetRateName, rateFilterName, rateType]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSetRateTypeName = useCallback(debounce(getRateTypesByName, DEFAULT_DEBOUNCE_TIME), []);
  useEffectRunOnce(() => {
    debounceSetRateTypeName();
  }, [debounceSetRateTypeName, rateTypesFilterName]);

  const validationSchema = useMemo(() => {
    const required = t("common:errors.general.required");

    const requiredValues: ObjectShape = {
      rate: yup.object().shape({
        id: yup.number().required(required),
        label: yup.string().required(required)
      }),
      type: yup
        .string()
        .required(required)
        .test("marginType.isValidPriceType", t("marketer_margin:form.errors.type"), (value) => isEnumType(value, MarginType)),
      minMargin: minMarginRequired,
      maxMargin: maxMarginRequired.test("marketer_margin.maxLowerThanMinMargin", t("common:errors.general.maxLowerThanMin"), (value, context) =>
        Boolean(value !== undefined && Number(value) >= Number(context.parent.minMargin))
      )
    };

    if (marginType === MarginType.CONSUME_RANGE) {
      requiredValues.minConsume = minConsumeRequired;
      requiredValues.maxConsume = maxConsumeRequired.test(
        "marketer_margin.maxLowerThanMinConsume",
        t("common:errors.general.maxLowerThanMin"),
        (value, context) => Boolean(value !== undefined && Number(value) >= Number(context.parent.minConsume))
      );
    }

    if (marginType === MarginType.RATE_TYPE) {
      requiredValues.rateType = yup.object().shape({
        id: yup.number().required(required),
        label: yup.string().required(required)
      });
    }

    return yup.object(requiredValues);
  }, [t, marginType]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: firstSubmit,
    validateOnChange: firstSubmit,
    enableReinitialize: true,
    onSubmit: async (values: FormCreateMarketerMarginValues, { setSubmitting }: FormikHelpers<FormCreateMarketerMarginValues>) => {
      if (!values.marketerId) {
        values.marketerId = marketerId;
      }
      setSubmitting(false);
      onSubmitForm(removeNullishValuesFromAnObject(values) as CreateMarketerMarginModel);
    }
  });

  useEffectRunOnce(() => {
    setMarginType(formik.values.type);
  }, [formik.values.type]);

  const onChangeRateType = useCallback(
    (value: Option | undefined) => {
      formik.setFieldValue("rateType", value);
      setRateType(value ? [value] : undefined);

      if (formik.values.rate) {
        onChangeRate(undefined);
        setRateFilterName("");
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setRateFilterName, formik.values.rate, setRateType]
  );

  const onChangeMarginType = (value: MarginType | undefined) => {
    setMarginType(value);
    formik.setFieldValue("type", value);

    if (value === MarginType.RATE_TYPE && formik.values.rate && formik.values.rate.rateType) {
      const rateType = {
        id: formik.values.rate.rateType.id,
        label: formik.values.rate.rateType.name
      };
      formik.setFieldValue("rateType", rateType);
      setRateType([rateType]);
    }
  };

  const onChangeRate = (value: Option | undefined) => {
    formik.setFieldValue("rate", value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  useEffectRunOnce(() => {
    setMarketerId(marketerId);
  }, [marketerId, setMarketerId]);

  useEffectRunOnce(() => {
    if (initialValues.type && !marginType) {
      onChangeMarginType(initialValues.type);
    }

    if (initialValues.rate && !isRateSet) {
      onChangeRate(initialValues.rate);
      setIsRateSet(true);
    }
  }, [initialValues.type, initialValues.rateType, initialValues.rate, marginType, isRateSet, onChangeMarginType, onChangeRate]);

  const { isFormEmpty } = useFormController({ formik, id, initialValues });

  return { formSchema: formik, isFormEmpty, onChangeRate, marginType, onChangeRateType, onChangeMarginType };
}
