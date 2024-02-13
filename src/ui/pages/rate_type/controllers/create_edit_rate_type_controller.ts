import type { Id } from "@/src/common/utils/types";
import { EnergyTypes } from "@/src/core/app/enums/energy_types";
import type { CreateRateTypeModel } from "@/src/core/rate_type/domain/models/create_rate_type_model";
import useFormController from "@/src/ui/hooks/useFormController";
import { yupPositiveNumberWithMaxDecimals, yupRequiredField } from "@/src/ui/utils/yup";
import i18n from "@/src/ui/i18n";
import { yup } from "@front_web_mrmilu/utils";
import type { FormikHelpers } from "formik";
import { useFormik } from "formik";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import type { ObjectShape } from "yup/lib/object";
import { removeNullishValuesFromAnObject } from "@/src/common/utils";

interface FormCreateRateTypeValues {
  id?: Id;
  name: string;
  energyType?: EnergyTypes;
  minPower?: number;
  maxPower?: number;
}

const formValues: FormCreateRateTypeValues = {
  id: undefined,
  name: "",
  energyType: undefined,
  minPower: undefined,
  maxPower: undefined
};

interface Props {
  onSubmitForm: (input: CreateRateTypeModel) => Promise<void>;
  initialValues?: FormCreateRateTypeValues;
  id?: Id;
}

const nameRequired = yupRequiredField();
const minPower = yupPositiveNumberWithMaxDecimals(2);
const maxPower = yupPositiveNumberWithMaxDecimals(2);
const required = i18n.t("errors.general.required", { ns: "common" });

export default function useCreateEditRateTypeForm({ onSubmitForm, initialValues = formValues, id }: Props) {
  const { t } = useTranslation(["common", "rate_type"]);
  const [energyType, setEnergyType] = useState<EnergyTypes>();
  const [firstSubmit] = useState(false);

  const isEnergyRateType = useCallback((value?: string) => {
    if (!value) {
      return false;
    }

    return Object.values(EnergyTypes).reduce((isValid, rateValue) => isValid || value === rateValue, false);
  }, []);

  const validationSchema = useMemo(() => {
    let yupObject: ObjectShape = {
      name: nameRequired,
      energyType: yup.string().required(required).test("rate_type.isValid", t("rate_type:form.errors.rate_type"), isEnergyRateType)
    };

    if (energyType && energyType === EnergyTypes.LIGHT) {
      yupObject = {
        ...yupObject,
        minPower,
        maxPower: maxPower.test(
          "rate_type.maxLowerThanMin",
          t("common:errors.general.maxLowerThanMin"),
          (value, context) =>
            (value === undefined && context.parent.minPower === undefined) || (!!value && Number(value) >= Number(context.parent.minPower))
        )
      };
    }

    return yup.object(yupObject);
  }, [isEnergyRateType, t, energyType]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: firstSubmit,
    validateOnChange: firstSubmit,
    onSubmit: async (values: FormCreateRateTypeValues, { setSubmitting }: FormikHelpers<FormCreateRateTypeValues>) => {
      setSubmitting(false);
      if (values.energyType) {
        onSubmitForm(removeNullishValuesFromAnObject(values) as CreateRateTypeModel);
      }
    }
  });

  const onChangeEnergyType = useCallback((value: EnergyTypes) => {
    formik.setFieldValue("energyType", value);
    setEnergyType(value);
    if (value === EnergyTypes.GAS) {
      formik.setFieldValue("minPower", undefined);
      formik.setFieldValue("maxPower", undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (initialValues.energyType && !energyType) {
      onChangeEnergyType(initialValues.energyType);
    }
  }, [initialValues.energyType, energyType, onChangeEnergyType]);

  const { isFormEmpty } = useFormController({ formik, id, initialValues });

  return { formSchema: formik, isFormEmpty, onChangeEnergyType, energyType };
}
