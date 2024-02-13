import { yup } from "@front_web_mrmilu/utils";
import type { FormikHelpers } from "formik";
import { useFormik } from "formik";
import { useMemo, useState } from "react";
import useFormController from "@/src/ui/hooks/useFormController";
import type { Id } from "@/src/common/utils/types";
import { useTranslation } from "react-i18next";
import { isEnumType, removeNullishValuesFromAnObject } from "@/src/common/utils";
import { EnergyTypes } from "@/src/core/app/enums/energy_types";
import type { ObjectShape } from "yup/lib/object";
import { yupCupsField } from "@/src/ui/utils/yup";
import type { CreateSavingStudyConfigurationModel } from "@/src/core/saving_study/domain/models/create_saving_study_configuration_model";

interface FormCreateSavingStudyValues {
  id?: Id;
  cups: string;
  energyType?: EnergyTypes;
  isExistingClient: boolean;
  isFromSIPS: boolean;
  isCompareConditions: boolean;
}

const formValues: FormCreateSavingStudyValues = {
  id: undefined,
  cups: "",
  energyType: undefined,
  isExistingClient: false,
  isFromSIPS: false,
  isCompareConditions: false
};

interface Props {
  onSubmitForm: (input: FormCreateSavingStudyValues) => Promise<void>;
}

const requiredCups = yupCupsField();

export default function useCreateSavingStudyConfigurationForm({ onSubmitForm }: Props) {
  const { t } = useTranslation(["common", "saving_study"]);
  const [firstSubmit] = useState(false);

  const validationSchema = useMemo(() => {
    const required = t("common:errors.general.required");
    const requiredValues: ObjectShape = {
      cups: requiredCups,
      energyType: yup
        .string()
        .required(required)
        .test("rate.isValidRateType", t("saving_study:form.errors.energyType"), (value) => isEnumType(value, EnergyTypes))
    };

    return yup.object(requiredValues);
  }, [t]);

  const formik = useFormik({
    initialValues: formValues,
    validationSchema,
    validateOnBlur: firstSubmit,
    validateOnChange: firstSubmit,
    onSubmit: async (values: FormCreateSavingStudyValues, { setSubmitting }: FormikHelpers<FormCreateSavingStudyValues>) => {
      setSubmitting(false);
      if (values.energyType) {
        onSubmitForm(removeNullishValuesFromAnObject(values) as CreateSavingStudyConfigurationModel);
      }
    }
  });

  const { isFormEmpty } = useFormController({ formik, initialValues: formValues });

  return { formSchema: formik, isFormEmpty };
}
