import { InputFormik } from "@/src/ui/components/input/input";
import { useTranslation } from "react-i18next";
import Styled from "./create_marketer_form.styled";

interface Props {
  className?: string;
}

export function CreateMarketerForm({ className = "" }: Props) {
  const { t } = useTranslation("marketer");

  return (
    <div className={className}>
      <InputFormik label={t("columns.name")} id="name" name="name" required />
      <InputFormik label={t("columns.fiscalName")} id="fiscalName" name="fiscalName" />
      <InputFormik label={t("columns.cif")} id="cif" name="cif" />
      <InputFormik label={t("columns.email")} id="email" name="email" />
    </div>
  );
}

export const CreateMarketerFormFlex = Styled.CreateMarketerFlex;
export const CreateMarketerFormGrid = Styled.CreateMarketerGrid;
