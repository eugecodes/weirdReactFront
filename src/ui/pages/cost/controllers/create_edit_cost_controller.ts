import type { Id, Option } from "@/src/common/utils/types";
import useFormController from "@/src/ui/hooks/useFormController";
import { yupPositiveNumberWithMaxDecimals, yupRequiredBoolean, yupRequiredField, yupRequiredPositiveNumberWithMaxDecimals } from "@/src/ui/utils/yup";
import { yup } from "@front_web_mrmilu/utils";
import type { FormikHelpers } from "formik";
import { useFormik } from "formik";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import type { ObjectShape } from "yup/lib/object";
import { debounce } from "lodash";
import { useEffectRunOnce } from "@front_web_mrmilu/hooks";
import { DEFAULT_DEBOUNCE_TIME, isEnumType, removeNullishValuesFromAnObject } from "@/src/common/utils";
import type { CreateCostModel } from "@/src/core/cost/domain/models/create_cost_model";
import { useAutocompleteRateProvider } from "@/src/ui/provider/autocomplete_rate.provider";
import { EnergyTypes } from "@/src/core/app/enums/energy_types";
import { CostType } from "@/src/core/app/enums/cost_type";
import { ClientType } from "@/src/core/app/enums/client_type";
import { useSearchParams } from "react-router-dom";

interface FormCreateCostValues {
  id?: Id;
  marketerId?: Id;
  name?: string;
  mandatory?: boolean;
  clientTypes?: ClientType[];
  energyType?: EnergyTypes;
  rates?: Option[];
  minPower?: string;
  maxPower?: string;
  type?: CostType;
  quantity?: string;
  extraFee?: string;
}

const formValues: FormCreateCostValues = {
  id: undefined,
  marketerId: undefined,
  name: "",
  mandatory: false,
  clientTypes: [],
  energyType: undefined,
  rates: [],
  minPower: "",
  maxPower: "",
  type: undefined,
  quantity: "",
  extraFee: ""
};

interface Props {
  onSubmitForm: (input: CreateCostModel) => Promise<void>;
  initialValues?: FormCreateCostValues;
  id?: Id;
}

const nameRequired = yupRequiredField();
const mandatoryRequired = yupRequiredBoolean();
const minPowerRequired = yupRequiredPositiveNumberWithMaxDecimals(2);
const maxPowerRequired = yupRequiredPositiveNumberWithMaxDecimals(2);
const quantityRequired = yupRequiredPositiveNumberWithMaxDecimals(2);
const extraFee = yupPositiveNumberWithMaxDecimals(2);

export default function useCreateEditRateForm({ onSubmitForm, initialValues = formValues, id }: Props) {
  const { t } = useTranslation(["common", "cost"]);
  const [isRateSet, setIsRateSet] = useState(false);
  const [firstSubmit] = useState(false);
  const [searchParams] = useSearchParams();
  const marketerId = useMemo(() => Number(searchParams.get("marketerId")), [searchParams]);

  const { getRateByName, rateFilterName, energyType, setEnergyType, setMarketerId } = useAutocompleteRateProvider((state) => ({
    getRateByName: state.getByName,
    rateFilterName: state.filterName,
    setEnergyType: state.setEnergyType,
    energyType: state.energyType,
    setMarketerId: state.setMarketerId
  }));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSetRateName = useCallback(debounce(getRateByName, DEFAULT_DEBOUNCE_TIME), []);
  useEffectRunOnce(() => {
    debounceSetRateName();
  }, [debounceSetRateName, rateFilterName, energyType]);

  const validationSchema = useMemo(() => {
    const required = t("common:errors.general.required");

    const requiredValues: ObjectShape = {
      name: nameRequired,
      mandatory: mandatoryRequired,
      clientTypes: yup
        .array()
        .of(
          yup
            .string()
            .required(required)
            .test("clientType.isValidClientType", t("cost:form.errors.clientType"), (value) => isEnumType(value, ClientType))
        )
        .test("rates.isValidClient", required, (value) => !!value && value.length > 0),
      energyType: yup
        .string()
        .required(required)
        .test("cost.isValidEnergyType", t("cost:form.errors.energyType"), (value) => isEnumType(value, EnergyTypes)),
      rates: yup
        .array(
          yup.object({
            id: yup.number().required(required),
            label: yup.string().required(required)
          })
        )
        .test("cost.isValidRates", required, (value) => !!value && value.length > 0),
      type: yup
        .string()
        .required(required)
        .test("type.isValidType", t("cost:form.errors.costType"), (value) => isEnumType(value, CostType)),
      quantity: quantityRequired,
      extraFee
    };

    if (energyType === EnergyTypes.LIGHT) {
      requiredValues.minPower = minPowerRequired;
      requiredValues.maxPower = maxPowerRequired.test("cost.maxLowerThanMinConsume", t("common:errors.general.maxLowerThanMin"), (value, context) => {
        return Boolean(value !== undefined && Number(value) >= Number(context.parent.minPower));
      });
    }

    return yup.object(requiredValues);
  }, [t, energyType]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: firstSubmit,
    validateOnChange: firstSubmit,
    enableReinitialize: true,
    onSubmit: async (values: FormCreateCostValues, { setSubmitting }: FormikHelpers<FormCreateCostValues>) => {
      if (!values.marketerId) {
        values.marketerId = marketerId;
      }
      setSubmitting(false);
      onSubmitForm(
        removeNullishValuesFromAnObject({
          ...values,
          minPower: Number(values.minPower),
          maxPower: Number(values.maxPower),
          quantity: Number(values.quantity),
          extraFee: Number(values.extraFee)
        }) as CreateCostModel
      );
    }
  });

  useEffectRunOnce(() => {
    setEnergyType(formik.values.energyType);
  }, [formik.values.type]);

  const onChangeEnergyType = useCallback((value: EnergyTypes | undefined) => {
    setEnergyType(value);
    formik.setFieldValue("energyType", value);

    if (value === EnergyTypes.GAS) {
      formik.setFieldValue("minPower", undefined);
      formik.setFieldValue("maxPower", undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeRate = useCallback((value: Option[] | undefined) => {
    formik.setFieldValue("rates", value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffectRunOnce(() => {
    setMarketerId(marketerId);
  }, [marketerId, setMarketerId]);

  useEffectRunOnce(() => {
    if (initialValues.type && !energyType) {
      onChangeEnergyType(initialValues.energyType);
    }

    if (initialValues.rates && !isRateSet) {
      onChangeRate(initialValues.rates);
      setIsRateSet(true);
    }

    if (initialValues.marketerId) {
      setMarketerId(initialValues.marketerId);
    }
  }, [initialValues.type, energyType, isRateSet, onChangeEnergyType, onChangeRate, initialValues.rates, initialValues.marketerId]);

  const { isFormEmpty } = useFormController({ formik, id, initialValues });

  return { formSchema: formik, isFormEmpty, onChangeRate, energyType, onChangeEnergyType };
}
