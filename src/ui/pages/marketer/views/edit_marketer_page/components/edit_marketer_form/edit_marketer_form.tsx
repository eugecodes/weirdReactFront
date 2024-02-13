import { useTranslation } from "react-i18next";
import Styled from "./edit_marketer_form.styled";
import { InputFormik } from "@/src/ui/components/input/input";
import { Button } from "@mui/material";
import { Form, FormikProvider } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useEffectRunOnce } from "@front_web_mrmilu/hooks";
import useShowToast from "@/src/ui/hooks/useShowToast";
import paths from "@/src/ui/router/paths";
import { useMutationMarketerProvider } from "@/src/ui/pages/marketer/providers/mutation_marketer.provider";
import type { EditMarketerModel } from "@/src/core/marketer/domain/models/edit_marketer_model";
import useCreateEditMarketerForm from "@/src/ui/pages/marketer/controllers/create_edit_marketer_controller";
import { useCallback } from "react";
import IconWithTooltip from "@/src/ui/components/icon_with_tooltip/icon_with_tooltip";
import { Information } from "@/src/ui/assets/icons";
import { convertNumberIntoString } from "@/src/common/utils";

export default function EditMarketerForm() {
  const { t } = useTranslation(["marketer", "common", "address"]);
  const { marketerId } = useParams();
  const navigate = useNavigate();
  const { getById: getMarketerById, item: marketer, edit: editMarketer } = useMutationMarketerProvider((state) => state);
  const { showToast } = useShowToast();

  const getMarketer = useCallback(async () => {
    if (marketerId) {
      const id = Number(marketerId);
      const response = await getMarketerById(id);

      if (!response) {
        navigate(paths.marketer.index);
      }
    }
  }, [getMarketerById, marketerId, navigate]);

  useEffectRunOnce(() => {
    getMarketer();
  }, [getMarketer]);

  const onSubmitForm = async (input: EditMarketerModel) => {
    await editMarketer(input, Number(marketerId));
    showToast({ message: t("marketer:actions.edited") });
    navigate(paths.marketer.index);
  };
  const { formSchema, isFormEmpty } = useCreateEditMarketerForm({
    onSubmitForm,
    initialValues: marketer
      ? { ...marketer, fee: convertNumberIntoString(marketer.fee), maxConsume: convertNumberIntoString(marketer.maxConsume) }
      : undefined,
    id: Number(marketerId)
  });

  return (
    <>
      <Styled.Header>
        <h2>{t("marketer:actions.edit")}</h2>
        <p>{t("common:editDescription")}</p>
      </Styled.Header>
      <FormikProvider value={formSchema}>
        <Form noValidate autoComplete="off">
          <div>
            <Styled.MarketerData>
              <h2>{t("marketer:standarInformation")}</h2>
              <div>
                <InputFormik name="name" label={t("marketer:columns.name")} required />
                <InputFormik name="fiscalName" label={t("marketer:columns.fiscalName")} />
                <InputFormik name="cif" label={t("marketer:columns.cif")} />
                <InputFormik name="email" label={t("marketer:columns.email")} />
              </div>
            </Styled.MarketerData>
          </div>
          <div>
            <Styled.MarketerData>
              <h2>{t("marketer:tabs.data")}</h2>
              <div>
                <Styled.InputWithTooltip>
                  <InputFormik name="fee" label={t("marketer:columns.fee")} type="number" />
                  <IconWithTooltip tooltip={t("marketer:info.fee")}>
                    <Information />
                  </IconWithTooltip>
                </Styled.InputWithTooltip>
                <Styled.InputWithTooltip>
                  <InputFormik name="maxConsume" label={t("marketer:columns.maxConsume")} />
                  <IconWithTooltip tooltip={t("marketer:info.maxConsumeRange")}>
                    <Information />
                  </IconWithTooltip>
                </Styled.InputWithTooltip>
              </div>
            </Styled.MarketerData>
          </div>
          <div>
            <Styled.MarketerData>
              <h2>{t("address:address")}</h2>
              <div>
                <InputFormik name="address.type" label={t("address:type")} />
                <InputFormik name="address.name" label={t("address:name")} />
                <InputFormik name="address.number" label={t("address:number")} />
                <InputFormik name="address.subdivision" label={t("address:subdivision")} />
                <InputFormik name="address.others" label={t("address:others")} />
                <InputFormik name="address.postalCode" label={t("address:postalCode")} />
                <InputFormik name="address.city" label={t("address:city")} />
                <InputFormik name="address.province" label={t("address:province")} />
              </div>
            </Styled.MarketerData>
          </div>
          <Styled.Button>
            <Button variant="contained" disabled={isFormEmpty} type="submit">
              {t("common:actions.save")}
            </Button>
          </Styled.Button>
        </Form>
      </FormikProvider>
    </>
  );
}
